# Tute 03

## 0. Class Representatives

> If you forgot to pick a class rep last week, pick them this week.

## 1. NodeJS Questions

A. What is the difference between NodeJS and NPM?

> NodeJS is a command line interpreter for the V8 engine (the actual javascript compiler). NPM is a package manager to help manage node based projects and their dependencies.

B. What is the difference between NPM and Yarn?

> Generally very little to a novice user. You can do your research to learn the differences between them, but on small scale applications the differences are negligable.

## 2. DOM & Browser Questions

A. What's the difference between NodeJS and a web browser?

> One of a command line tool and the other is a web browser. They both use Javascript's V8 engine to compile javascript code.

B. Where do we generally include CSS imports in our HTML code?

> CSS imports usually go in our `<head>` tag, because we want to import styles prior to the page loading, to prevent an HTML rendering without styles.

C. Where do we generally include JS imports in our HTML code?

> JS imports usually go at the bottom of our `<body>` tag. This is to ensure that the default elements in the DOM fully load before our javascript (which generally interacts with the DOM) is run.

## 3. ReactJS Questions

A. Why do we use `className` in ReactJS, but `class` in vanilla Javascript?

> `className` is the JSX component property that equates to `class`. It's transpiled to class.

## 4. JS Art

The file `building.html` contains some HTML and CSS, which we are going to use to create some interactive art. However, we will not be editing `building.html` directly - instead we will use Javascript and the DOM API in the script `building.js` to manipulate the DOM.

1. Before rendering the HTML file, what can you tell about the page? What sorts of elements does the HTML body contain? What do you notice about the CSS?

> The body only contains two elements: one is a `div` tag with the class `building`, the other is a `script` tag. When the HTML renders it will execute whatever code is in `building.js`.
> The CSS not only contains the regular styling for `body`, elements with ID `building` and elements with class `window`, but it also seems to define styling for these elements in some "night-mode".
> You don't need to spend too much time on CSS selectors, as long as they understand that the styling is conditional on the `body` having attribute `[night]`.

2. Using only Javascript and the DOM API, add 9 square windows to the building. The windows should be 50 x 50px, with a margin of 25px.

> Don't forget to add the class `window` so it will be styled by the CSS

3. Now, add a keyboard shortcut that will add a window when the UP (`ArrowUp`) button is pressed, and remove a window when the DOWN (`ArrowDown`) button is pressed.

4. Add another keyboard shortcut that will move the building left/right by 50px when the LEFT/RIGHT buttons are pressed.

5. Add an event handler that will toggle on/off night mode when the user clicks anywhere on the screen.
