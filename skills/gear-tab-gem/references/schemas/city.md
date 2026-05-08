# City Schema (Canonical Reference)

This is the working city schema — the first gear-tab Gem built and confirmed working. Use it as the model when deriving schemas for new subjects.

## Schema

```js
const DATA = {
  city: "",           // subject name — shown in header
  tagline: "",        // one evocative phrase — shown as subtitle
  origin_story: [
    { epoch_name: "", timeframe: "", description: "" }
    // 4-6 objects
  ],
  waterway: [
    { body_of_water: "", historical_lifeline_role: "", modern_utility: "" }
    // 4-6 objects
  ],
  visual_anchors: [
    { landmark_name: "", architectural_significance: "", navigational_context: "" }
    // 4-6 objects
  ],
  culinary_identity: [
    { specialty_or_tradition: "", flavor_profile: "", primary_node: "" }
    // 4-6 objects
  ],
  districts_and_nodes: [
    { district_name: "", urban_function: "", visitor_experience: "" }
    // 4-6 objects
  ]
};
```

## Tab Labels

| Data Key | Tab Label |
|---|---|
| `origin_story` | Origin Story |
| `waterway` | Waterway |
| `visual_anchors` | Visual Anchors |
| `culinary_identity` | Culinary Identity |
| `districts_and_nodes` | Districts |

## Card Layouts

**Origin Story:** epoch_name (CardTitle, --brand), timeframe (Pill), description (body, --text-card)

**Waterway:** body_of_water (CardTitle, --brand), historical_lifeline_role (body, --text-card), modern_utility (italic, --text-muted)

**Visual Anchors:** landmark_name (CardTitle, --brand), architectural_significance (body, --text-card), navigational_context (Pill)

**Culinary Identity:** specialty_or_tradition (CardTitle, --brand), flavor_profile (Pill), primary_node (📍 prefix, --text-muted)

**Districts:** district_name (CardTitle, --brand), urban_function (subtitle, --text-muted), visitor_experience (body, --text-card)

## Field Design Principles

Each section has exactly 3 fields per object:
- **Field 1** — the name/title. Rendered as CardTitle in --brand.
- **Field 2** — the main content. Rendered as body paragraph in --text-card.
- **Field 3** — a contextual note, location, or qualifier. Rendered as Pill, italic, or with an emoji prefix in --text-muted.

When designing a new schema, apply this same 3-field pattern. The third field is always the "where/when/how" grounding detail.

## Reference App

The working City Explorer reference app lives at:
`/Users/tom/Documents/agent-test/Projects/Gems/city-explorer-reference.jsx`

Use it as a structural template when building reference .jsx files for new subjects.
