// Standalone Google Drive OAuth - CommonJS
const { google } = require('C:/Users/tomew/AppData/Local/npm-cache/_npx/901beb8b1a496dd2/node_modules/googleapis');
const http = require('http');
const { URL } = require('url');
const fs = require('fs');

const keyFile = require('C:/Users/tomew/.notebooklm-mcp-cli/gcp-oauth.keys.json');
const keys = keyFile.web;
const credentialsPath = 'C:/Users/tomew/.notebooklm-mcp-cli/gdrive-token.json';

const oauth2Client = new google.auth.OAuth2(
  keys.client_id,
  keys.client_secret,
  'http://localhost:3000/oauth2callback'
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/drive.readonly'],
});

console.log('Open this URL in your browser:\n' + authUrl + '\n');

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3000');
  console.log('Got request:', url.pathname);

  if (url.pathname !== '/oauth2callback') {
    res.end('Waiting for OAuth callback...');
    return;
  }

  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.end('Auth rejected: ' + error);
    console.error('Auth error:', error);
    server.close();
    return;
  }

  if (!code) {
    res.end('No code received.');
    server.close();
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    fs.writeFileSync(credentialsPath, JSON.stringify(tokens, null, 2));
    res.end('Authentication successful! Token saved. You can close this tab.');
    console.log('SUCCESS — token saved to:', credentialsPath);
    server.close(() => process.exit(0));
  } catch (e) {
    console.error('Token exchange failed:', e.message);
    res.end('Token exchange failed: ' + e.message);
    server.close(() => process.exit(1));
  }
});

server.on('error', (e) => {
  console.error('Server error:', e.message);
  process.exit(1);
});

server.listen(3000, () => {
  console.log('Listening on port 3000, waiting for callback...');
});
