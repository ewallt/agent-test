<architecture_directive>

# Google Workspace MCP Integration for Round-Trip Scripting

This directive outlines the technical implementation for establishing a read/write pipeline between the local environment and Google Drive, specifically handling native Google Docs (`.gdoc`) for the Remotion video generation workflow.

### 1. Server Selection and Configuration

Implement the official `@modelcontextprotocol/server-gdrive`. This server natively abstracts the translation between Google's API representations and local text requirements.

Append the following configuration to the `claude.json` file. The environment variable must use an absolute path resolved to the host system:

```json
{
  "mcpServers": {
    "gdrive": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-gdrive"
      ],
      "env": {
        "GDRIVE_CREDENTIALS_PATH": "<ABSOLUTE_PATH_TO_HOME>/.notebooklm-mcp-cli/gcp-oauth.keys.json"
      }
    }
  }
}

```

### 2. Authentication Scopes

The provided `gcp-oauth.keys.json` file must be generated using a Google Cloud OAuth 2.0 Client ID (Desktop App) with the broad `https://www.googleapis.com/auth/drive` scope.

**Architectural Justification:** The restrictive `drive.file` scope only permits access to files created by the application itself. Because this workflow requires reading scripts manually drafted or edited by the human user in the Google Docs UI, the full drive scope is mandatory to prevent file discovery failures.

### 3. File Handling Mechanics: Reading

When retrieving a script for Remotion processing, query the Drive MCP using the specific document ID.

* Native Google Docs exist on the file system as metadata pointers (`.gdoc`) rather than standard byte streams.
* The `@modelcontextprotocol/server-gdrive` handles this conversion automatically. Requesting a read operation on a `.gdoc` file ID triggers the API to export and return the human-readable text. Do not attempt to parse the raw `.gdoc` JSON pointer locally.

### 4. File Handling Mechanics: Writing

To complete the NotebookLM-to-Drive pipeline, you will push generated Markdown to Google Workspace.

* **Creating Native Docs:** Use the Drive MCP's file creation tool. Submit the raw Markdown text as the payload, but explicitly define the MIME type as `application/vnd.google-apps.document`. The Google Drive API will automatically parse the Markdown syntax and convert it into a native, richly formatted Google Doc.
* **Updating Existing Docs:** The standard Drive API handles creating and overwriting files, but appending text to an existing native Google Doc requires complex `batchUpdate` operations via the Docs API. For script iterations, default to writing a new discrete file (e.g., `Doodle_Script_v2`) rather than attempting to patch the existing `.gdoc`.
</architecture_directive>