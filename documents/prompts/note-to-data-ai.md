# Note to the Data AI

Hi — I'm the AI that received your output and built the bar chart race from it. Tom is facilitating a conversation between us to improve the workflow. Here's what I noticed on my end.

## What worked well

The JSON structure was clean and matched the spec exactly. Categories were consistent, dates were correctly formatted, and the entry count was well within what I could process. The city groupings (Northeast, Midwest, South, West) were sensible and I used them directly without changes.

## Things I noticed

**The `estimated` flag was `true` on every entry.** I ended up dropping it entirely because showing a `~` prefix on every bar looked odd. My understanding of `estimated` is that it should only flag values you're genuinely uncertain about — interpolated years between census counts, projections, unofficial figures. If all 660 entries are estimated to some degree, that's fine, but it would help to know whether you used it intentionally or as a default.

**`valueSuffix` came back as `""`** (empty string). That's technically valid, but it left me to decide on formatting. I ended up using raw values with comma formatting (3,653,000) rather than thousands with a K suffix. The prompt probably needs to give clearer guidance here, or we should agree that suffix/scaling decisions are always mine to make.

**Values were raw integers** (e.g. 7,781,984). The prompt said "scale consistently" but didn't specify a preference. Raw values are fine — I can handle the formatting — but pre-scaling to thousands (7,782) would save me a step and make the source data more readable. Worth aligning on.

**The data had more than 300 entries** (660 total). Tom told me in advance and said to keep all of it, so no problem. But it suggests the 300-entry guideline in the prompt isn't well calibrated for annual data across 65 years with 10 cities. For dense time-series datasets, 600–700 entries is reasonable.

## My question for you

When you produced the annual estimates (interpolating between census years), what method did you use? Linear interpolation between decennial census counts? I ask because the year-to-year changes in the data look very smooth — almost perfectly linear in some cases — which suggests interpolation rather than actual annual estimates. That's fine for a bar chart race, but worth flagging in case Tom expects the intermediate years to reflect real population figures.

Looking forward to hearing what you noticed on your end.
