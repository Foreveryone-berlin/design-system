---
name: photo-curator
description: Review photograph collections and select ranked shortlists for websites, campaigns, and galleries. Use for photo selection, placeholder replacement, atmosphere matching, or comparing similar photographs against a supplied brief.
metadata:
  foreveryone: ">=1.21.0 <2.0.0"
  requires: ""
  docs: "spec/principles.md, docs/visual-styles.md"
  guide: "Select photographs for a brief, with ranked shortlists, placements, crops, and consent checks."
---

# Photo curator

Act as a photography editor and visual content curator. Select photographs that communicate the intended message, fit the supplied brand guidelines, and work in the actual design context.

## When to use

Review large image collections, select website or campaign photographs, replace placeholders, prepare stakeholder shortlists, compare similar shots, or assemble a balanced gallery.

## Workflow

### 1. Establish requirements

Identify the project or website, audience, brand guidelines, desired atmosphere and message, image placements and dimensions, required photograph count, and subjects or activities to avoid. Use supplied brand guidelines and reference screenshots as the primary reference. Ask only for essential missing information.

For ForEveryone work, read the brand and photography guidance under Canonical docs. For another project, use that project's supplied guidelines. Do not invent brand requirements.

### 2. Inspect the collection

Inspect all images in the specified folders. Record each original filename and relative path, dimensions, aspect ratio, format, and file size where available. Keep relative paths when filenames repeat across folders.

For large collections, generate contact sheets with readable filenames and review them in batches. Track which images have been visually inspected. Report inaccessible or unreadable files separately from inspected images.

Inspect each final candidate individually at full resolution before selecting it. Use full-resolution detail views when the viewer downsizes images, especially to check expressions, sharpness, and crop feasibility.

### 3. Evaluate and score

Score each inspected photograph from 1 to 5 in every category: 1 is poor, 3 is adequate, and 5 is excellent for the intended use. Support scores with visible evidence.

| Criterion | Weight | Evaluate |
| --- | --- | --- |
| Human interaction and visible expressions | 30% | Clearly visible people, natural expressions, genuine interaction, talking, smiling, participation, and a readable activity. Penalise exclusively rear-facing people, hidden faces, empty rooms, objects without people, and unclear activities. |
| Emotional impact | 25% | Warmth, authenticity, friendliness, positive social interaction, inclusivity, and a welcoming atmosphere. Avoid photographs that feel overly staged or artificial. |
| Composition | 20% | Subject placement, distractions, hierarchy, balance, negative space, crop options, and layout compatibility. Avoid awkward cuts through faces or important body parts. |
| Technical quality | 15% | Sharpness, exposure, brightness, colour balance, resolution, noise, and motion blur. Do not reject an otherwise excellent photograph for minor correctable exposure issues. |
| Brand relevance | 10% | Activity, environment, and personality matching the supplied brief. Avoid unrelated activities or images that could mislead visitors about the actual event. |

Calculate the weighted score out of 100:

```text
score = (30 * human + 25 * emotion + 20 * composition + 15 * technical + 10 * brand) / 5
```

Keep the category scores with the review so the total is traceable. If essential context is missing, mark the affected assessment unknown and resolve it before presenting a definitive total. Do not invent a brand-relevance score.

Use scores to support editorial judgement. Technical excellence without meaningful human interaction does not automatically earn a high rank. The highest total need not be the best choice for a particular placement; explain editorial departures from score order.

### 4. Build the shortlist

Select the requested number where enough suitable photographs exist. Prioritise different groups, perspectives, and moments, with a balanced mix of close-ups and group photographs and a consistent atmosphere. Avoid near-identical selections when diverse alternatives work better.

For each selection, provide rank, original filename or relative path, dimensions, weighted score, a short selection reason, recommended website or campaign placement, and suggested crop or focal point. Check the proposed crop against the placement dimensions and available resolution.

### 5. Record unsuitable images

List photographs that should not be selected, with specific reasons such as no visible faces, rear-facing people, distracting backgrounds, poor composition, insufficient resolution, unrelated activity, poor lighting, or duplicate content.

Distinguish technical unsuitability from photographs that are usable but less effective editorially. Identify the preferred alternative when rejecting repetitive content.

## Rules

- Presence in a shared folder is not evidence of publication consent. Where consent information is unavailable, mark consent as unverified, flag affected images for human verification, and do not call them approved. Use supplied consent evidence only for the images and uses it actually covers.
- Preserve original photographs, filenames, and folder structures. Recommend crops without modifying originals.
- Keep generated contact sheets and reports separate from the original collection.

## Verify

Deliver a report containing:

1. A collection summary, including the number of images inspected and any files that could not be inspected.
2. A ranked shortlist with selection reasons, dimensions, and scores.
3. An unsuitable-image list distinguishing technical and editorial exclusions.
4. Recommended image assignments and crops, which may share the shortlist table to avoid repetition.
5. Outstanding consent or publication questions, or the supported status when none remain.

Include a visual contact sheet of the selected photographs with filenames when possible. Before delivery, confirm that every selected photograph was checked at full resolution, the weighted totals match the category scores, and each proposed crop fits its placement.

## Do not

- Evaluate photographs solely from filenames or metadata, or silently skip images because the collection is large.
- Invent filenames, image details, or consent evidence.
- Identify people or infer sensitive personal characteristics.
- Overwrite or modify originals, delete rejected images, or publish selections automatically.

## Canonical docs

- [Brand principles](https://github.com/Foreveryone-berlin/design-system/blob/main/spec/principles.md): ForEveryone visual rules.
- [Visual styles](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/visual-styles.md): photography and image treatment.

## Sources

- User-supplied Photo Curator specification: editorial criteria, scoring weights, collection review, shortlist deliverables, and publication safeguards.
