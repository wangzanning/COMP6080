# Lab 08

### Due: Week 8, Sunday, 8:00 pm

### Value: 2 marks

## Overview

### Change Log

N/A

### Aim

* Apply essentail accessibility learnings
* Explore use of ReactJS component libraries
* Learn to lint javascript code

## Exercise 1 - Improved ReactJS app

In the `exercise1` folder run `yarn` and then `yarn start`.

This contains a *very bad* react app, with a single component, that attempts to display a simple page with a header, footer, and body that has an input and a button.

### Part 1

This code fails to adhere to a number of very basic accessibility and best practice examples that are covered in lecture **"Accessibility - Part 2"**. Review this lecture, and implement any and all relevant improvements to the code to make it more accessible.

### Part 2

Setup `eslint` with the default configuration. Run `yarn add --dev eslint-config-react-app` in the `exercise1` folder. This will install a dev dependency to allow you to lint your react app with eslint. Once that is installed, run `yarn eslint src/**.js` in your exercise1 directory. This will lint all javascript files.

Ensure your `exercise1` passes the linter.

### Part 3

It's time to try and use a React based library - **Material UI**.

Install Material UI with yarn [here](https://material-ui.com/getting-started/installation/)

```sh
yarn add @material-ui/core
```

Once installed, add at least two Material UI components to your ReactJS app. They can be headers, buttons, alerts, cards - anything. They must be clearly visible to someone using the page.

## [Challenge] Exercise 2

Develop a basic `storybook` library in the `exercise2` folder for 2-3 components that you create. Have each component parameterised on at least two properties.

The components can be buttons, inputs, alerts - anything you like.

This activity has a learning outcome focused on the demonstration of effective understanding of storybook.

## Submission Instructions

Your master branch will automatically submit itself at the due date listed at the top of this page. Once you have completed your work, you must ensure that your master branch (on gitlab) reflects the code that you want to have submitted.
