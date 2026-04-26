#!/usr/bin/env python3
"""
YouTube upload script for NLM cinematic videos.

Usage:
    python youtube-upload.py --file "path/to/video.mp4" --title "Video Title" --playlist "Playlist Name"

One-time setup:
    1. Get OAuth credentials from Google Cloud Console (YouTube Data API v3, Desktop app)
    2. Save as tools/youtube-client-secrets.json
    3. Run once — browser opens for authorization, token saved to tools/youtube-token.json

Dependencies:
    pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
"""

import argparse
import json
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
TOKEN_FILE  = SCRIPT_DIR / 'youtube-token.json'
SECRETS_FILE = SCRIPT_DIR / 'youtube-client-secrets.json'
PLAYLISTS_FILE = SCRIPT_DIR.parent / 'documents' / 'youtube-playlists.json'

SCOPES = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube',
]


def get_credentials():
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow

    creds = None
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not SECRETS_FILE.exists():
                print(f"ERROR: OAuth credentials not found at {SECRETS_FILE}")
                print("Get them from Google Cloud Console → YouTube Data API v3 → OAuth 2.0 Client ID → Desktop app")
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(str(SECRETS_FILE), SCOPES)
            creds = flow.run_local_server(port=0)
        with open(TOKEN_FILE, 'w') as f:
            f.write(creds.to_json())
    return creds


def load_playlist_config(playlist_name):
    if not PLAYLISTS_FILE.exists():
        print(f"ERROR: Playlist config not found at {PLAYLISTS_FILE}")
        sys.exit(1)
    with open(PLAYLISTS_FILE, encoding='utf-8') as f:
        data = json.load(f)
    playlists = data.get('playlists', {})
    if playlist_name not in playlists:
        available = ', '.join(f'"{p}"' for p in playlists)
        print(f"ERROR: Playlist '{playlist_name}' not found in youtube-playlists.json")
        print(f"Available: {available}")
        sys.exit(1)
    return playlists[playlist_name]


def upload_video(youtube, file_path, title, description, private=False):
    from googleapiclient.http import MediaFileUpload

    body = {
        'snippet': {
            'title': title,
            'description': description,
            'categoryId': '27',  # Education
        },
        'status': {
            'privacyStatus': 'private' if private else 'public',
            'selfDeclaredMadeForKids': False,
        },
    }

    media = MediaFileUpload(file_path, chunksize=-1, resumable=True)

    print(f"Uploading: {title}")
    request = youtube.videos().insert(
        part=','.join(body.keys()),
        body=body,
        media_body=media,
    )

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            pct = int(status.progress() * 100)
            print(f"  {pct}%  ", end='\r', flush=True)

    print(f"  100% — upload complete.")
    return response['id']


def add_to_playlist(youtube, video_id, playlist_id):
    youtube.playlistItems().insert(
        part='snippet',
        body={
            'snippet': {
                'playlistId': playlist_id,
                'resourceId': {
                    'kind': 'youtube#video',
                    'videoId': video_id,
                },
            }
        },
    ).execute()


def main():
    parser = argparse.ArgumentParser(description='Upload an NLM video to YouTube')
    parser.add_argument('--file',        required=True, help='Path to video file (.mp4)')
    parser.add_argument('--title',       required=True, help='YouTube video title')
    parser.add_argument('--playlist',    required=True, help='Playlist name (must match youtube-playlists.json)')
    parser.add_argument('--private',     action='store_true', help='Upload as Private instead of Public')
    parser.add_argument('--description', default=None, help='Video description (overrides playlist default)')
    args = parser.parse_args()

    if not Path(args.file).exists():
        print(f"ERROR: File not found: {args.file}")
        sys.exit(1)

    config      = load_playlist_config(args.playlist)
    description = args.description if args.description else config['description']
    hashtags    = config['hashtags']
    playlist_id = config.get('playlistId', '')

    from googleapiclient.discovery import build
    creds   = get_credentials()
    youtube = build('youtube', 'v3', credentials=creds)

    video_id = upload_video(youtube, args.file, args.title, description, private=args.private)
    url = f"https://www.youtube.com/watch?v={video_id}"

    print(f"\n{'Private' if args.private else 'Published'}: {url}")

    if playlist_id and playlist_id not in ('', 'PLxxx'):
        add_to_playlist(youtube, video_id, playlist_id)
        print(f"Added to playlist: {args.playlist}")
    else:
        print(f"Note: No playlistId set in youtube-playlists.json — add it to auto-assign videos to the playlist.")

    print(f"\nFor X / Facebook:\n{url}\n\n{hashtags}")


if __name__ == '__main__':
    main()
