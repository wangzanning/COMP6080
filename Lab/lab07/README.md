# Lab 07

### Due: Week 7, Sunday, 8:00 pm

### Value: 2 marks

## Overview

### Change Log

N/A

### Aim

* Use ReactJS Hooks for their intended purpose.
* Develop knowledge of fetch/async/await.
* Express your basic understanding of UI/UX.

## Exercise 1 - Promises & Async/Await

In the `exercise1` folder run `yarn` and then `yarn start`.

This file currently uses promises (`promise.then().catch`) to handle the asynchronous fetch and json decoding. Refactor this code to only use `async`/`await` syntax.

After the conversion the component should have identical functionality.

## Exercise 2 - React App

In the `exercise2` folder run `yarn` and then `yarn start`.

Build a simple ReactJS app that does the following:
* Has an input form field where a user can enter a list of comma separated Github user names (e.g. `UNSWComputing`, `Microsoft`, `Google`). Examples of one of these can be found [here](https://api.github.com/users/Microsoft).
* After 500 miliseconds from the last time this user input fires an `onChange` event, the list of comma separated user names is split, and for each one a `fetch` is made to collect data at the URL "https://api.github.com/users/[USERNAMEGOESHERE]". You can leverage the stub code provided in `exercise1` to get a good head start here.
* Once ALL of the fetches complete (and not before), you shall display a series of cards underneath on the page. Each card should be a separate ReactJS component that is imported into your `App.js`. Each component simply needs to consist of:
  * A 50px by 50px image that is the `avatar_url` property returned by the fetch
  * The `name` of the organisation (derived from the `name` property of the fetch), where clicking on this name links (in a new tab) to the `url` (derived from the `url` property of the fetch).

Note: You can implement the multiple fetches one of two ways:
 * With a loop and async/await
 * Using promises (preferable), where you can execute many promises at once using [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

In this exercise you are expected to use: `fetch`, `React.useEffect`, `React.useState`, ReactJS Functional Components.


## [Challenge] Exercise 3 - Class component conversion

In the `exercise3` folder run `yarn` and then `yarn start`.

This ReactJS app currently uses functional components. Convert this functional component into a ReactJS **Class Component**. After the conversion the component should have identical functionality.

## Submission Instructions

Your master branch will automatically submit itself at the due date listed at the top of this page. Once you have completed your work, you must ensure that your master branch (on gitlab) reflects the code that you want to have submitted.
