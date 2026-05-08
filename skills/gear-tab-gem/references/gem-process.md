# Gem Process

## How to Create the Gem

1. Go to **https://gemini.google.com/gems/create**
2. Give the Gem a name (e.g. "City Explorer")
3. Paste the contents of `[subject]-instructions.md` into the **Instructions** field
4. Attach `[subject]-reference.jsx` as a **knowledge file**
5. Make sure **Canvas** is enabled
6. Save the Gem

## How to Use the Gem

Type a subject name in the prompt box (e.g. a city name, a battle name). The Gem generates a complete React app in Canvas.

## What Each File Does

- **Instructions** — tells Gemini its role, what tabs to build, and to follow the reference file
- **Reference .jsx** — gives Gemini working React code to copy; the `.jsx` extension is required for Gemini to treat it as a React template

## Critical: The .jsx Extension

The reference file **must** have a `.jsx` extension. Using `.html` causes Gemini to misinterpret the file and output JSON or prose instead of a React app. This was the key lesson from the first City Explorer iteration.
