# Dymocks

Some basics include:

## Responsiveness
* Banner text cut off on some mobile views
* No indicators on mobile for sliding left & right
* Inefficient use of viewport (some elements are oversized)
* Hamburger menu can't be closed on mobile

## Code Review
* Certain `</div>` closing tags missing
* Use of `<table>` to do non-tabular layout
* Many form elements don't have correlating `for` attributes to `label` tags.

## Accessibility
* Over-use of `<div>` and `<span>` where `<section>` or `<footer>` woudl have been more appropriate
* Many images do not have `alt` attributes. Good example of this is the banner which has all its text as an image, but no alt text
* Very limited titles for hover explaining where the links take you and providing that context
* Challenging to tell what is clickable and what isn't - i.e. not visible changes
* Contrast too low in some areas
* Fonts are relatively too small, probably too small