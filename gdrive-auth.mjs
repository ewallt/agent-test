// Standalone Google Drive OAuth script
import { OAuth2Client } from 'C:/Users/tomew/AppData/Local/npm-cache/_npx/901beb8b1a496dd2/node_modules/google-auth-library/build/src/index.js';
import { createServer } from 'http';
import { URL } from 'url';
import { writeFileSync, readFileSync } from 'fs';
import { createRequire } from 'module';
import { open } from 'C:/Users/tomew/AppData/Local/npm-cache/_npx/901beb8b1a496dd2/node_modules/open/index.js';

const require = createRequire(import.meta.url);
const keyFile = require('C:/Users/tomew/.notebooklm-mcp-cli/gcp-oauth.keys.json');
const keys = keyFile.web;
const credentialsPath = 'C:/Users/tomew/.notebooklm-mcp-cli/gdrive-token.json';

const client = new OAuth2Client({ clientId: keys.client_id, clientSecret: keys.client_secret });
const redirectUri = 'http://localhost:3000/oauth2callback';

const authorizeUrl = client.generateAuthUrl({
  redirect_uri: redirectUri,
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/drive.readonly',
});

console.log('Auth URL:', authorizeUrl);

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3000');
  console.log('Request:', url.pathname);
  if (url.pathname !== '/oauth2callback') {
    res.end('Waiting for OAuth callback...');
    return;
  }
  if (url.searchParams.has('error')) {
    res.end('Auth rejected: ' + url.searchParams.get('error'));
    server.close();
    return;
  }
  const code = url.searchParams.get('code');
  if (!code) {
    res.end('No code received.');
    server.close();
    return;
  }
  try {
    const { tokens } = await client.getToken({ code, redirect_uri: redirectUri });
    writeFileSync(credentialsPath, JSON.stringify(tokens));
    res.end('Authentication successful! Token saved. You can close this tab.');
    console.log('Token saved to', credentialsPath);
    server.close();
  } catch (e) {
    console.error('Token exchange failed:', e.message);
    res.end('Token exchange failed: ' + e.message);
    server.close();
  }
});

server.on('error', (e) => {
  console.error('Server error:', e.message);
  process.exit(1);
});

server.listen(3000, () => {
  console.log('Listening on port 3000, opening browser...');
  open(authorizeUrl).catch(e => console.error('Failed to open browser:', e.message));
});
