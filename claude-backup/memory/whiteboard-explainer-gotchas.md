# Whiteboard Explainer — Gotchas

## 1. `registerRoot()` must be called explicitly

**Error:** Studio shows "waiting for registerRoot"

**Cause:** Entry point (`src/index.ts`) was exporting the root component instead of calling `registerRoot()`.

**Fix:**
```ts
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";
registerRoot(RemotionRoot);
```

**Prevention:** Never just export the root — always call `registerRoot()`.

---

## 2. `TransitionSeries` rejects Fragment wrappers and conditional null children

**Error:** `TypeError: Cannot read properties of null (reading 'stack')` at `setup-sequence-stack-traces.js:19`

**Cause:** `TransitionSeries` uses strict child inspection and cannot handle `React.Fragment` wrappers or conditionally-null children (`{condition && <Component />}`).

**Fix:** Build a flat array imperatively, then pass via `React.createElement`:
```tsx
const children: React.ReactNode[] = [];
scenes.forEach((scene, i) => {
  if (i > 0 && scene.transition) {
    children.push(<TransitionSeries.Transition key={...} ... />);
  }
  children.push(<TransitionSeries.Sequence key={...} ...>...</TransitionSeries.Sequence>);
});
return React.createElement(TransitionSeries, {}, ...children);
```

**Prevention:** Never use Fragment or conditional JSX inside `TransitionSeries`. Always build children as a flat array and spread them.

---

## 3. `React.createElement` second arg must be `{}` not `null`

**Error:** Same `props.stack` crash as above, even after fixing the Fragment issue.

**Cause:** `React.createElement(TransitionSeries, null, ...children)` passes `null` as props. Remotion's stack-trace wrapper reads `props.stack` without a null check, crashing immediately.

**Fix:**
```tsx
// Wrong
React.createElement(TransitionSeries, null, ...children)

// Right
React.createElement(TransitionSeries, {}, ...children)
```

**Prevention:** Always pass `{}` as the second arg to `React.createElement` when working with Remotion components.

---

## 4. `clockWipe()` requires explicit dimensions

**Error:** TypeScript error — `ClockWipeProps` missing `width` and `height`.

**Fix:**
```tsx
clockWipe({ width: 1920, height: 1080 })
```

---

## 5. Composition `id` cannot contain underscores

**Cause:** Remotion rejects composition IDs with underscores — they are not valid URL path characters for the Studio browser route.

**Fix:** Use hyphens instead: `id="WhiteboardExplainer-1"` not `id="WhiteboardExplainer_1"`.

**Prevention:** Always use hyphens in composition IDs. File names (e.g. `scenes.example_1.json`) can use underscores — only the `id` prop is constrained.

---

## 6. `React.createElement(TransitionSeries, {}, ...children)` causes TS overload error

**Error:** `No overload matches this call. Argument of type '{}' is not assignable to parameter of type '(Attributes & SequencePropsWithoutDuration) | null | undefined'`

**Cause:** TypeScript's `React.createElement` overloads don't match when spreading a `ReactNode[]` into rest args with a typed component like `TransitionSeries`.

**Fix:**
```tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
return (React.createElement as any)(TransitionSeries, {}, ...children);
```

**Prevention:** Cast `React.createElement` as `any` when spreading children into `TransitionSeries`.

---

## 7. `tsconfig.json` requirements

Required for the project to compile:
```json
"resolveJsonModule": true,   // to import scenes.example.json
"skipLibCheck": true          // avoids @types/dom-webcodecs conflicts with Remotion
```
