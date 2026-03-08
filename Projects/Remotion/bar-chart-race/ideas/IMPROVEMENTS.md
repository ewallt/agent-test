# Improvement Ideas

Ideas noted during development. Not prioritized — just a running list.

---

## Visual / Layout

**Lab name under model name on bar labels**
Each bar label currently shows just the model name. Showing the lab name below it (smaller, dimmer) would make it easier to track which lab owns which model without always consulting the legend.

**Colored dot on bar labels**
A small colored dot (lab color) next to each model name — makes the lab association immediate without needing the legend at all.

**"isNew" highlight fades during hold**
The newest entry is highlighted in white/bold for the entire duration of its keyframe (transition + hold). It would feel more natural for the highlight to fade back to normal during the hold period.

**Background grid lines**
Faint vertical lines at score intervals (e.g. 50%, 70%, 90%) would make it easier to read absolute scores at a glance.

**Progress indicator**
A subtle timeline or progress bar at the very bottom showing how far through the race we are (time-wise, not frame-wise).

---

## Animation

**Smoother continuous time progression**
Currently the date jumps discretely at each keyframe. A continuous interpolation between dates would make the video feel more like a live race and less like a slideshow.

**Easing on bar entry/exit opacity**
Entering and exiting bars currently fade linearly. An ease-in for entry and ease-out for exit would feel more polished.

**End card holding final standings**
After the last entry, the video cuts off. A 3–5 second hold on the final standings (with a title like "Final standings — Feb 2026") would give the viewer time to absorb the result.

---

## Story Cards

**Card color tied to trigger model's lab, not current keyframe's lab**
The story card border/title color currently uses `kf.newLab` (the lab of whichever entry the current frame belongs to). This means the color can flicker if the card spans multiple keyframes with different labs. Tying the color to the card's trigger model's lab would keep it stable for the card's full duration.

---

## Structure / Engine

**Intro title card**
2–3 seconds before the race starts: a title screen with the chart name, date range, and data source. Would make the video feel more complete as a standalone artifact.

**Per-project render script**
`npm run render` currently hardcodes the `AiMmlu` composition ID. A small wrapper that accepts a project name as an argument (e.g. `npm run render ai-mmlu`) would make multi-project rendering cleaner.

**Config validation at startup**
A function that checks the config before rendering starts — verifying lab names match labColors, no duplicate models, all story card triggers exist in entries, etc. Would catch mistakes early rather than producing a silently broken video.
