---
name: social-media-graphics
description: Produce on-brand graphics and images from a saved visual recipe, in every size a platform needs, stamped with a growth experiment ID. Use to design a social post, thumbnail, banner, one-pager, or blog image.
---

# Social Media Graphics

## When to use

Any graphic or image that implements a growth experiment.

## Dependencies — fails closed

1. Reads `brand/visual-recipes.json` via `my-brand-visuals`. If it doesn't exist, run that first.
2. Attach work to an **EXP-ID** from `growth/pipeline.md`. **If none fits, stop** and offer `experiment-design`.

## The problem this actually solves

Any tool makes a decent graphic. **Post #40 looking like post #1 is the hard part**, and it's what makes a small brand look established.

Consistency doesn't come from a tool. It comes from a recipe with locked parts and varying parts, saved as a file. Re-describing the style each time is what causes drift: describe a look in your own words twice and you'll get two looks.

## How to run it

**Ask only what the recipe doesn't answer:**

1. **Which EXP-ID?**
2. **Which format** — Instagram square, LinkedIn wide, Stories vertical, blog hero, og-image?
3. **What's the subject?** Not the topic — the image needs something to depict. **Propose it from the content** rather than asking cold.
4. **Anything to avoid for this one?**

**Then:**

1. Load the recipe. Fill only the varying slots.
2. **Check what the last few used** in `assets/visuals/_log.md`. If the last three shared a look, rotate.
3. Compose the prompt by **substituting values, never rewording them.** Copy locked clauses verbatim.
4. Attach a reference image where the tool supports it.
5. Generate, then show everything together for review before anything gets published.
6. **Log it** — date, EXP-ID, post, format, anchor, palette, seed, file, alt text.

## Every size, same language

Make one, then produce the other sizes from the same recipe. Same visual language, different slots.

## Three routes to the same graphic

| Route | When | What you get |
|---|---|---|
| **Claude Design** | Nothing installed | A canvas you click into — edit text, spacing, colour |
| **Canva connector** | You already live in Canva | An editable design in your own Canva account |
| **Figma plugin** | You have a designer | Editable files someone can finish properly |
| **Direct generation** | Illustration rather than layout | Image via OpenAI or Runway from the recipe |

Layout work — text, hierarchy, CTA — belongs in a design canvas. Generated imagery is for illustration. Text baked into a generated image is nearly always a mistake.

## Vendor handoff

If `vendors/roster.md` has an active **designer**, write `vendors/briefs/EXP-NNN-designer.md` from the designer template (sizes, recipe pointers, claims/copy allowed) instead of — or in addition to — generating yourself. Append the brief path to the experiment follow-up log.

## Save and close

1. Save files under `assets/visuals/`.
2. Append `assets/visuals/_log.md` (create from `templates/visuals-log.md` if missing).
3. Update experiment follow-up log + `_state.md`.

## Guardrails

- Reference a mood or colour grade, never a specific living artist's style, and never recreate a recognisable character, frame or brand asset.
- If a chart is the clearest way to show a finding, say so — a generated image isn't always the answer.
- Every image ships with alt text written in brand voice.
- Keep the never-list active.
- No asset without an EXP-ID.
