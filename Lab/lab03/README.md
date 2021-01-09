# Lab 3

### Due: Week 3, Sunday, 8:00 pm

### Value: 2 marks

## Overview

### Change Log

Empty

### Aim

* Demonstrate skills in using NodeJS in the context of NPM to solve problems.
* Demonstrate skills in using DOM manipulation with javascript to build and modify pages
* Demonstrate a very basic understanding of how to create a ReactJS app and modify it slightly

## Exercise 1 - NodeJS & NPM

In this exercise we will set up an NPM package, install some modules, and then write a nodejs file that uses them, before minifying our code.

1. `cd` into your `exercise1` folder and run `npm init`. This will create an NPM package in this folder.

2. Install the `uuid` dependency by running `npm install uuid`. This installs the `uuid` library, which allows you to generate (UUIDs)[https://en.wikipedia.org/wiki/Universally_unique_identifier].

3. Open the file `ids.js`. Modify the file so that when you run `node ids.js`, it outputs 30 randomly generated UUIDs in sorted order, one on each line.

4. After that, print out the 5 most commonly occuring characters (not including dashes) across ALL of the generate UUIDs.

5. Once you have your program working, run `npm install minify` which installs a node based program that allows you to *minify* your code (remove all unnecessary whitespace - usually something we do to code before deploying it. Once code is deployed performance is more important than readability). You can run `npx minify ids.js > ids.min.js`.

An example output is below:
```txt
00d0a144-4837-4f0b-94c2-f274281c8f7e
020c23f9-592a-496a-8d34-febd9940ef74
0c6220ec-d751-4de0-8675-ebaee2a50e26
11f4b97e-7e22-43d7-a9ec-2734fcbe0758
1a115013-fa63-4c96-aaf4-09169d3bfe80
22430824-83c2-4dfd-b5d3-5ad19bca04a0
22acbcbb-8498-4c0b-982d-9c2e1afad624
27967738-10a6-4185-b604-21cc36f01671
2c49fa91-fdb6-4965-bc14-1011cc6c812f
375c1404-33b3-4a35-ad79-dd6ae6fe0f82
3a945cd3-9a9b-4163-9fff-58aefdb3c1d1
43f21a44-49ab-4f4f-852e-e7734fda2b37
47a804e3-c94a-43a4-84df-1a49e7e13058
59340457-3e91-417f-a8b1-746716a508ff
5b7c6b55-d769-46fd-a1d7-9e6cd6709cf8
61ba1338-5c81-495d-9378-e4d0e2f2e8f5
67e7c2c7-fb7f-40e1-8d53-47293fe42fe8
69073023-a72d-4ded-8540-5a80c16666a9
6c1154bb-59e5-4088-8a16-c68165fd2a81
804f39a0-76f5-476b-ba1d-9c020d41ae6c
871db203-529b-4ab3-ab2f-17ea74967b00
8f6e40ca-0675-48f2-84b3-caf8c64e0097
b42e10ce-84da-4d97-b3dd-53e3429d9c86
c048a5ad-a966-4cb8-89fd-df02a7a93497
d1e3fafd-34be-4bac-ab45-566a6ab1c91d
d450737c-e4ad-402c-8700-1e62ff754d0f
d71b3288-ac95-4802-83f7-cfbc98600054
d814e1ca-fbef-4fe2-a7cd-790be73d4d7b
d82166b9-a2b7-4d10-9b0d-3436d9d822c9
fb14997c-831d-4715-a4ea-55c12ed34a4f
4 a 0 1 d
```

## Exercise 2 - Browser JS & DOM

A stub page has been created in `exercise2/page.html`. This page has an empty body tag, and we want you to build the page below, however, only using javascript and the DOM API. The DOM lectures will give you a starting point for this work.

Fill the script `exercise2/build.js` file to build the following HTML elements within the body tag.

```html
<div>
    <p>Hello there,</p>
    <p>I am a llama, hear my sirens roar:</p>
    <ul>
        <li>The</li>
        <li>Duck</li>
        <li>Lemonade</li>
        <li>Stand</li>
    </ul>
</div>
```

## Exercise 3 - Browser JS & DOM


A stub page has been created in `exercise3/page.html`. This page has an empty body tag, and we want you to build the page below, however, only using javascript and the DOM API. The DOM lectures will give you a starting point for this work.

Fill the script `exercise3/build.js` file to build the following HTML elements within the body tag.

```html
<div style="background: #000000;">
	<a target="_blank" href="https://google.com"><img src="https://i.ytimg.com/vi/yJiVZUKAS84/maxresdefault.jpg" alt="Me and my sibling" /></a>
	<hr />
	<table>
		<tr>
			<th>Name</th>
			<th>Age</th>
			<th>Height</th>
		</tr>
		<tr>
			<td>Sarah</td>
			<td>22</td>
			<td>188</td>
		</tr>
		<tr>
			<td>Lin</td>
			<td>42</td>
			<td>134</td>
		</tr>
		<tr>
			<td>Samir</td>
			<td>21</td>
			<td>155</td>
		</tr>
		<tr>
			<td>Wayne</td>
			<td>29</td>
			<td>162</td>
		</tr>
		<tr>
			<td>Eckhart</td>
			<td>112</td>
			<td>144</td>
		</tr>
	</table>
</div>
```

## Exercise 4 - ReactJS

Create a new ReactJS app in your `exercise4` folder by running `npx create-react-app exercise4`.

You can navigate to the `exercise4` folder and then run `yarn start` which will start up the development environment (essentailly a mini deployment that will automatically reload when you make changes to your code).

While `yarn start` is running, open the file `src/App.js` and `src/App.css` in an editor. These is the file we are going to edit for this lab.

Make your ReactJS app look identical to the page below.

![](./exercise4.png)

Take note of:
 * The background colour
 * The rough font sizes
 * The spacing between elements

Key assets include:
 * (Image of the cat)[https://i.ytimg.com/vi/wWqdhBdeMSg/hqdefault.jpg]
 * The `Cat Video 1` and `Cat Video 2` can be two URLs to YOUR favourite cat videos on youtube.

The page can be any size, we won't be assessing you on the overall dimensions, as long as everything is on the page as described.

Ensure that you place your CSS properties together in relevant class names and then store those classes in `src/App.css`

## (Optional) Challenge Exercise 5 - NodeJS

Make a new NPM package in the `exercise5` folder.

#### Part 1

Make a file `birth-days.js`. Using `momentjs` (install it via npm) you are going to list all of days of birthdays that someone who is 14 years old, with a bithday of today (i.e. whatever day the script is run).

For example, one output might be:
```txt
Thursday
Friday
Tuesday
Monday
Sunday
Sunday
Monday
Tuesday
Thursday
Friday
Tuesday
Monday
Sunday
Sunday
```

#### Part 2

Make a file `hour-mash.js` that prints out the following:
```txt
The day started [5] hours ago. One week ago it was [Wednesday] at [3:33 PM]. Today's date is [18/09/2020]. There are exactly [44949] seconds until 9am on Friday.
```

Items in brackets are wildcards that should be values you populate. All values should be determined based off the moment that the script is run.

## Submission Instructions

Your master branch will automatically submit itself at the due date listed at the top of this page. Once you have completed your work, you must ensure that your master branch (on gitlab) reflects the code that you want to have submitted.
