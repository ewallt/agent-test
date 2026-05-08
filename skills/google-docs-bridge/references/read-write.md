# Read and Write

Use the helper scripts in `C:\Users\tomew\Documents\codex-test\tools\`.

## Read a document

```powershell
python C:\Users\tomew\Documents\codex-test\tools\read_google_doc.py --doc-id <doc-id>
```

## Search Drive

```powershell
python C:\Users\tomew\Documents\codex-test\tools\search_drive_docs.py --query "<drive-query>"
```

## List a folder

```powershell
python C:\Users\tomew\Documents\codex-test\tools\list_drive_folder.py --folder-id <folder-id>
```

## Create a Google Doc from a file

```powershell
python C:\Users\tomew\Documents\codex-test\tools\write_google_doc_from_file.py --title "<doc-title>" --file "<path-to-source-file>" --folder-id <folder-id>
```

## Create a new blank doc with preset content

```powershell
python C:\Users\tomew\Documents\codex-test\tools\create_google_doc.py --title "<doc-title>"
```

## Verification

After any write, read the document back and confirm the expected content is present.
