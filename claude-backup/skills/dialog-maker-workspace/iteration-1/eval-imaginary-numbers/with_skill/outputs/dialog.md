# Why Are They Called Imaginary? What Do They Actually Represent?

---

**Student:** I've been working through complex numbers in class, and I keep getting tripped up by the name. "Imaginary numbers" — was that just a historical accident, or does the name actually mean something? Because honestly, $\sqrt{-1}$ feels more like a rule I'm following than something I actually understand.

**Prof:** You've put your finger on something that has bothered mathematicians for centuries, and you're in excellent company being bothered by it. The name is partly a historical accident, but not an innocent one — it carries baggage that actively misleads people. Let me start with the history, because it reframes everything.

**1. The Name Was an Insult**

René Descartes coined the term *nombres imaginaires* in 1637 — and he meant it dismissively. He was saying: these are not real quantities, they're fictions we conjure up when algebra misbehaves. Gottfried Leibniz called them "amphibians between being and non-being." Even the mathematicians who used them weren't sure they believed in them. The name stuck not because it was accurate but because it was vivid, and because for a long time no one had a better story to tell.

**2. The Name We Should Have Used**

When Gauss gave imaginary numbers their proper geometric interpretation in 1831, he explicitly complained about the terminology. He suggested calling $i$ a *lateral unit* — a unit that moves *sideways* rather than forward or backward along a number line. If his terminology had won, we'd say "lateral numbers" today, and no one would find them mysterious. The geometric picture would be built into the name.

**3. What They Actually Are**

Here's the reframe: imaginary numbers are not a defect in the real numbers. They're a *direction* the real numbers don't have. The real number line goes left and right; imaginary numbers go perpendicular to it. When you write $3 + 2i$, you're not adding a real number to a fictional one — you're specifying a point in a two-dimensional plane: three units along the real axis, two units along the imaginary axis.

$$3 + 2i \longleftrightarrow (3, 2) \in \mathbb{R}^2$$

The name "imaginary" makes it sound like something is missing. The geometric picture reveals that something was *added* — a new dimension.

So when you say $\sqrt{-1}$ feels like a rule you're following: you're right that the algebra alone doesn't explain what's happening. The explanation lives in geometry.

---

**Student:** Okay, that actually helps — thinking of $i$ as a direction rather than a number. But I'm still puzzled about something. If $i$ is just the "up" direction, why do we need to invent it at all? I can already work with pairs of real numbers $(3, 2)$. What does writing $3 + 2i$ give me that $(3, 2)$ doesn't?

**Prof:** You are 100% correct that $3 + 2i$ and $(3, 2)$ carry the same *information*. This is a genuinely sharp observation, and it brings us to the heart of what complex numbers actually are. The question isn't whether the coordinates are different — it's what you can *do* with them.

**1. Pairs of Numbers Don't Multiply Naturally**

Given two points $(3, 2)$ and $(1, 4)$, how do you multiply them? There's no canonical answer. You could multiply component-wise: $(3, 6)$. You could take a dot product and get a scalar. You'd have to make a choice, and different choices give you different — and mostly uninteresting — things.

Complex multiplication is different. It's not arbitrary; it's *forced* by the rule $i^2 = -1$:

$$(3 + 2i)(1 + 4i) = 3 + 12i + 2i + 8i^2 = 3 + 14i - 8 = -5 + 14i$$

That rule encodes something geometrically remarkable, which brings me to the second point.

**2. Multiplication Is Rotation**

When you multiply a complex number by $i$, you rotate it $90°$ counterclockwise around the origin. Always. This is not a coincidence — it's the entire content of $i^2 = -1$. Rotate $90°$ twice and you're pointing the opposite direction, which is multiplication by $-1$.

More generally, multiplying by any complex number $r e^{i\theta}$ simultaneously *scales* by $r$ and *rotates* by $\theta$. The pair-of-real-numbers representation hides this completely. The complex number representation makes it visible in the structure of the arithmetic.

**3. The Deeper Point**

So the difference between $(3, 2)$ and $3 + 2i$ is like the difference between a street address and GPS coordinates. They locate the same place, but GPS coordinates come pre-loaded with a system — distances, angles, transformations — that street addresses don't have baked in. Writing $3 + 2i$ is committing to a particular *algebraic structure* on the plane, one where multiplication means rotation-and-scaling.

This is why complex numbers appear everywhere in physics and engineering: any time you have a phenomenon that involves oscillation, rotation, or wave behavior, the mathematics of rotation-and-scaling is already in the complex number system waiting to be used.

---

**Student:** I think I see it. So $i^2 = -1$ isn't just a definition someone made up — it's what rotation by $90°$ twice *does*. It sends you to $-1$ because that's a $180°$ rotation, pointing backwards. The algebra is encoding the geometry.

**Prof:** You hit the bullseye. That's exactly it — and the fact that you put it that way, "the algebra is encoding the geometry," is the mature framing that most students don't arrive at until much later.

Let me make this precise, because the precision makes it even more satisfying.

**1. The Unit Circle and Euler's Formula**

Every complex number of absolute value 1 can be written as $e^{i\theta}$, where $\theta$ is the angle it makes with the positive real axis. This is Euler's formula:

$$e^{i\theta} = \cos\theta + i\sin\theta$$

Now watch what happens when $\theta = \frac{\pi}{2}$:

$$e^{i\pi/2} = \cos\frac{\pi}{2} + i\sin\frac{\pi}{2} = 0 + i \cdot 1 = i$$

So $i$ is not some alien object — it is literally the point at $90°$ on the unit circle. And squaring it means applying the rotation twice:

$$i^2 = e^{i\pi/2} \cdot e^{i\pi/2} = e^{i\pi} = \cos\pi + i\sin\pi = -1 + 0 = -1$$

The equation $i^2 = -1$ is the statement that rotating $180°$ gives you the point at $(-1, 0)$. It's not a rule handed down by algebra gods. It's a geometric fact expressed in algebraic notation.

**2. What Descartes Got Wrong**

Here's the irony: Descartes called imaginary numbers fictions because they weren't "real" in the sense of lying on the number line he trusted. But the number line is itself a model — an idealization. By insisting on one dimension, he was the one making an arbitrary choice. $i$ isn't an admission that the real numbers fall short; it's a recognition that one-dimensional thinking was always too narrow for the full structure of geometry.

**3. The Thread We've Been Pulling**

We started with a name — "imaginary" — that sounded like a confession of inadequacy. We've arrived at the view that complex numbers are, in a precise sense, the *completion* of real-number arithmetic: the smallest extension of $\mathbb{R}$ in which every polynomial has a root, and the natural home for rotation, oscillation, and wave mathematics.

The name is wrong. The objects are more real than the word suggests — and more geometrically fundamental than most people ever realize.

Which raises a question I'll leave with you: if multiplying by $i$ rotates by $90°$, what would multiplying by $\sqrt{i}$ do?

---

**Student:** I think... it would rotate by $45°$? Because if $i$ is a $90°$ rotation, then $\sqrt{i}$ should be "half" of that rotation. So it would be the point on the unit circle at $45°$, which is $\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i$. And multiplying that by itself should give $i$, which is $(0, 1)$... I actually think I can verify that.

**Prof:** Your logic here is completely sound based on how the proof is structured. Go ahead and verify it — you'll find it works out exactly. And notice what just happened: you didn't ask me what $\sqrt{i}$ is. You *reasoned* about what it had to be from first principles, using the geometric picture we built. That's a different posture toward mathematics than following a rule.

**1. The Verification**

You claimed $\sqrt{i} = \frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i$. Let's check:

$$\left(\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i\right)^2 = \frac{1}{2} + 2 \cdot \frac{\sqrt{2}}{2} \cdot \frac{\sqrt{2}}{2} \cdot i + \frac{1}{2}i^2 = \frac{1}{2} + i - \frac{1}{2} = i \checkmark$$

In polar form, this is even cleaner: $\sqrt{i} = e^{i\pi/4}$, the point at $45°$, just as you said.

**2. What This Reveals About the Name**

Here's the full irony of Descartes' terminology. He called $i$ "imaginary" because he couldn't picture it. But once you have the geometric picture, $i$ is less mysterious than, say, $\pi$ or $e$ — you can point to it. It's the point straight up on the unit circle. It's the operation of turning left. You can't point to $\pi$; you can only describe it as a limit, a ratio, an infinite series. In what sense is $i$ more "imaginary" than that?

**3. The Larger Pattern**

What you've discovered is that once you understand the *geometry* of complex numbers, the algebra becomes intuitive rather than mechanical. This pattern repeats across mathematics: mysterious-seeming algebraic rules often turn out to be geometric or structural facts wearing algebraic clothing. The rule $i^2 = -1$ isn't arbitrary; it's what the geometry demands. The notation is a compressed description of a picture.

You started this conversation saying $\sqrt{-1}$ felt like a rule you were following. By the end you're deriving new results from geometric reasoning. That shift — from following rules to understanding why the rules are what they are — is what mathematics is for.

---
