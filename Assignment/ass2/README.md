# Assessment 2 - Vanilla JS: Quickpic

1. Background & Motivation
2. The Task (Frontend)
3. The Support (Backend)
4. Constraints & Assumptions
5. Marking Criteria
6. Originality of Work
7. Submission
8. Late Submission Policy

## 0. Change Log

* 08-10:
  * Clarity given in plagiarism section for students who have done COMP2014 in 2018.
  * Added section "4.5. Static HTML, innerHTML, DOM manipulation"
  * Moved the backend to it's own repository (for everyone's ease), and updated instructions accordingly in section 3. If you copied the backend from CSE servers prior to 3am on the 8th October, you will likely want to delete that folder and clone the new repository there.
  * Section 2.5.4 updated with correct items described to pass in.
  * Section 2.6.1 updated to reflect that polling should be used, not `/latest`
  * Section 9 FAQ added
  * Removed irrelevant helper functions in helper.js and api.js.
  * Updated fileReader helper in helper.js to be more useful.
  * Removed non compiling code from main.js.
  * Added jsdoc comments to all initially provided code.
* 12-10:
  * Adding instructions in `2.` of how to run the frontend behind a HTTP server to more easily interact with backend.
* 15-10:
  * Clarified that for 2.5.2 you are not required to upload a new image.
  * Clarification (here) that while the usage of async/await isn't banned in this assignment, we still discourage it's use because learning and understanding how promises work is a critical skill in the workforce.
  * Adding section 3.1 to give a bit of help in terms of both exploring the DB and some example usernames that already exist in the DB that you can follow. This should save some people some time.
* 16-10:
  * Profile pics no longer required to be displayed, since this information is not available in the backend.
* 20/10:
  * Removed another trailing reference to profile pic
  
## 1. Background & Motivation

Web-based applications are becoming the most common way to build a digital capability accessible to a mass audience. While there are modern tools that help us build these rapidly, it's important to understand the fundamental Javascript-based technology and architectures that exist, both to gain a deeper understanding for when these skills may be needed, but also to simply understand the mechanics of fundamental JS. Even when working with a high level framework like React, understanding (in-concept) the code that is transpiled-to will ensure you're a more well rounded web-based engineer.

This assignment consists of building a **front-end** website in Vanilla JS (no React or other frameworks). This front-end will interact with a RESTFUL API HTTP back-end that is built in Python/Flask and provided to you.

Information about how to talk to this API can be found the "promises & fetch" lecture.

The page you build is required to be a single page app (SPA). Single page apps give websites an "app-like feeling", and are characterised by their use of a single full load of an initial HTML page, and then using AJAX/fetch to dynamically manipulate the DOM without ever required a full page reload. In this way, SPAs are generated, rendered, and updated using Javascript. Because SPAs don’t require a user to navigate away from a page to do anything, they retain a degree of user and application state. In short, this means you will only ever have `index.html` as your HTML page, and that any sense of "moving between pages" will just be modifications of the DOM.

## 2. The Task (Frontend)

Stub code has been provided to help you get started in:
 * `frontend/index.html`
 * `frontend/styles/provided.js`
 * `frontend/src/api.js`
 * `frontend/src/helpers.js`
 * `frontend/src/main.js`

You can modify or delete this stub code of you choose. It's simply here to potentially provide some help.

If you want more help getting started, you can see the Monday Week 5 Live Lecture.

To work with your frontend code locally with the web server, you will have to run another web server to serve the frontend. To do this, in you rproject folder you can run:

`$ python3 -m http.server`

This will start up a second HTTP server where if you navigate to `http://localhost:8000` (or whatever URL it provides) it will run your `index.html`

### 2.1. Milestone 1 - Registration & Login (15%)

This focuses on the basic user interface to register and log in to the site.

#### 2.1.1. Login（done）
 * When the user isn't logged in, the site shall present a login form that contains:
   * a username field (text)
   * a password field (password)
   * submit button to login
 * When the submit button is pressed, the form data should be sent to `POST /auth/login` to verify the credentials. If there is an error during login an appropriate error should appear on the screen.
 * Once the user is logged in, they should be able to see the feed which says "Not yet implemented"

#### 2.1.2. Registration(need more test)
 * When the user isn't logged in, the login form shall provide a link/button that opens the register form. The register form will contain: 
   * a username field (text)
   * a password field (password)
   * a confirm password field (password) - not passed to backend, but error thrown on submit if doesn't match other password
   * an email address (text)
   * a name (text)
   * submit button to register
 * When the submit button is pressed, the form data should be sent to `POST /auth/signup` to verify the credentials. If there is an error during login an appropriate error should appear on the screen.
 * Once the user is logged in, they should be able to see the feed which says "Not yet implemented"

#### 2.1.3. Error Popup(Not yet)
 * Whenever the frontend or backend produces an error, there shall be an error popup on the screen with a message (either a message derived from the backend error rresponse, or one meaningfully created on the frontend).
 * This popup can be closed/removed/deleted by pressing an "x" or "close" button.

### 2.2. Milestone 2 - Basic Feed (10%)

Milestone 2 focuses on fetching feed data from the API.

#### 2.2.1. Basic Feed (done)

The application should present a "feed" of user content on the home page derived `GET /user/feed`.

The posts should be displayed in reverse chronological order (most recent posts first). 

Each post should display:
1. Who the post was made by
2. When it was posted
3. The image itself
4. How many likes it has (or none)
5. The post description text
6. How many comments the post has

Although this is not a graphic design exercise you should produce pages with a common and somewhat distinctive look-and-feel. You may find CSS useful for this.

## 2.3. Milestone 3 - Advanced Feed (10%)

Milestone 3 focuses on a richer UX and will require some backend interaction.

### 2.3.1. Show Likes (done)
* Allow a user to see a list of all users who have liked a post. You can just display all of them at once by default, or you can optionally (not required) toggle whether it's visible or not with a simple button.

### 2.3.2. Show Comments (done)
* Allow a user to see all the comments on a post. You can just display all of them at once by default, or you can optionally (not required) toggle whether it's visible or not with a simple button.

### 2.3.3. Ability for you to like content (done)
* A logged in user can like a post on their feed and trigger a api request (`PUT /post/like`)
* For now it's ok if the like doesn't show up until the page is refreshed.

### 2.3.4. Feed Pagination (not yet)
* Users can page between sets of results in the feed using the position token with (`GET user/feed`).
* Note users can ignore this if they properly implement Infinite Scroll in a later milestone.

## 2.4. Milestone 4 - Other users & profiles (10%)

<<<<<<< Updated upstream
### 2.4.1. Profile View / Profile View
* Let a user click on a user's name from a post and see a page with the users name, and any other info the backend provides.
=======
### 2.4.1. Profile View / Profile View (half done)
* Let a user click on a user's name/picture from a post and see a page with the users name, and any other info the backend provides.
>>>>>>> Stashed changes
* The user should also see on this page all posts made by that person.
* The user should be able to see their own page as well.

### 2.4.2. Follow (done)
* Let a user follow/unfollow another user too add/remove their posts to their feed via (`PUT user/follow`)
* Add a list of everyone a user follows in their profile page.
* Add just the count of followers / follows to everyones public user page

## 2.5. Milestone 5 - Adding & updating content (10%)

Milestone 5 focuses on more advanced features that will take time to implement and will involve a more rigourously designed app to execute.

### 2.5.1. Adding a post (done)
* Users can upload and post new content from a modal or seperate page via (`POST /post`)

### 2.5.2. Updating & deleting  a post (not yet)
* Let a user update a post they made or delete it via (`DELETE /post`) or (`PUT /post`). You are not required to allow the user to be able to update the image of a post.

### 2.5.3. Leaving comments (done)
* Users can write comments on "posts" via (`POST post/comment`)

### 2.5.4. Updating the profile (done)
* Users can update their personal profile via (`PUT /user`) E.g:
  * Update email address
  * Update password
  * Update name

## 2.6. Milestone 6 - Challenge Components (`advanced`) (10%)

### 2.6.1. Infinite Scroll (not yet)
* Instead of pagination, users an infinitely scroll through results. For infinite scroll to be properly implemented you need to progressively load posts as you scroll. 

### 2.6.1. Live Update
* If a user likes a post or comments on a post, the posts likes and comments should update without requiring a page reload/refresh.

### 2.6.1. Push Notifications
* Users can receive push notifications when a user they follow posts an image. To know whether someone or not has made a post, you must "poll" the server (i.e. intermittent requests, maybe every second, that check the state). 

*Polling is very inefficient for browsers, but can often be used as it simplifies the technical needs on the server.*

## 2.7. Milestone 7 - Very Challenge Components (`advanced *= 2`) (5%)

### 2.7.1. High Quality UX/UI
* The user interface looks good, is performant, makes logical sense, and is usable. This most likely requires doing testing with other users (family, friends) to get feedback about usability.

### 2.7.2. Static feed offline access
* Users can access the most recent feed they've loaded even without an internet connection.
* Cache information from the latest feed in local storage in case of outages.
* When the user tries to interact with the website at all in offline mode (e.g. comment, like) they should receive errors

### 2.7.3 Fragment based URL routing
Users can access different pages using URL fragments:
```
/#profile=me
/#feed
/#profile=janecitizen
```

## 3. The Support (Backend) - no work required

The backend server is not part of your repository (due to it's size). However, we have put it on a publically accessible repo (so only one copy, rather than separate repos deployed to every student).

<a href="https://gitlab.cse.unsw.edu.au/COMP6080/20T3/ass2-backend">You can access the backend repository here</a>. Clone this repository onto your working machine. 

`git clone gitlab@gitlab.cse.unsw.edu.au:COMP6080/20T3/ass2-backend backend`

Once cloned, you can view the `README.md` in new repository to see how to get the server running.

The backend server will be where you'll be getting your data. Don't touch the code in the backend; although we've provided the source, it's meant to be a black box. Final testing will be done with our own backend. Use the instructions provided in the backend/README.md to get it started.

For the full docs on the API, start the backend server and navigate to the root URL in a web browser (very likely to be `localhost:5000`). You'll see all the endpoints, descriptions and expected responses.

Your backend server must be running for your frontend to interact with it. Your frontend must call the backend server on the correct port.

**Please `git pull` on the backend server at least every couple of days. We will no doubt be pushing fixes and clarifications as they arise over the first week. `git pull` before you work will give you the latest changes.**

### 3.1. Exploring the DB

If you're comfortable with basic SQL, in the `ass2-backend` folder, you can upload the `db/test.sqlite3` file to an online explorer such as (sqliteonline.com)[sqliteonline.com].

To get started, though, here are some usernames that you can have test accounts "follow":
* Andrew
* Ava
* Sarah
* Matthew
* Jack
* Harper
* Zoe
* Amelia

For example, after registering a user, you can call `PUT /user/follow` to follow one of these users. After that, if you call `GET /user/feed` you will be able to see updates on the feed.

## 4. Constraints & Assumptions

### 4.1. Languages

You must implement this assignment in ES6-compliant vanilla javascript. You cannot use ReactJS, JQuery, or other abstract frameworks. You can not, for example, use the popular Javascript framework such as <a  href="https://angular.io/">Angular</a> or <a  href="https://reactjs.org/">React</a>

### 4.2. Browser Compatibility

You should ensure that your programs have been tested on one of the following two browsers:
 * Locally, Google Chrome (various operating systems) version 85.XX
 * On CSE machines, Chromium version 83.XX

### 4.3. External libraries

 * You may use small amounts (&lt; 10 lines) of general purpose code (not specific to the assignment) obtained from a site such as Stack Overflow or other publically available resources. You should attribute clearly the source of this code in a comment with it. You can not otherwise use code written by another person.
 * You may include external CSS libraries in this assignment (with the `<link />` tag). You must attribute these sources (i.e. provide the URL/author in source code comments). For example, you are permitted to use the popular <a href="https://getbootstrap.com/">Bootstrap</a> CSS framework. Some Bootstrap functionality relies on accompanying Javascript. You are permitted to include this Javascript. The  Javascript accompanying Bootstrap requires the popular general purpose Javascrpt library <a href="https://jquery.com/">jQuery</a>.  You are permitted to include <b>jQuery</b> so bootstrap can use it.  However you are not permitted to use <b>jQuery</b> in the code you write for the assignment.
 * You may **NOT** directly use external JavaScript. Do not use NPM except to install the helper development libraries.

### 4.4. Other Requirements
 * The specification is intentionally vague to allow you to build frontend components however you think are visually appropriate. Their size, positioning, colour, layout, is in virtually all cases completely up to you. We require some basic criteria, but it's mainly dictating elements and behaviour.
 * This is not a design assignment. You are expected to show common sense and critical thinking when it comes to basic user experience and visual layout, but you are not required to be creative to achieve full marks.

### 4.5. Static HTML, innerHTML, DOM manipulation

In this assignment, you are:
 * Allowed to add static HTML/CSS to the stub website provided (i.e. you can put raw HTML/CSS as if its a static page, even if you then later manipulate it with Javascript).
 * Allowed to build HTML elements and add CSS properties to the DOM via javascript. We expect this to be the most common way students build these pages
 * Are **not** allowed to use the `innerHTML` property of nodes/tags to set the inner HTML of an element. This has security vulnerabilities and is in general not best practice. Either statically add the HTML/CSS and manipulate it with javascript, or generate and build nodes/elements in Javascript (just like lectures/tutes/labs), or both. But don't set inner HTML.

## 5. Marking Criteria

Your assignment will be hand-marked by tutor(s) in the course according to the criteria below.

<table>
	<tr>
		<th>Criteria</th>
		<th>Weighting</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Compliance to task requirements</td>
		<td>70%</td>
		<td>
			<ul>
				<li>Each milestone specified a aprticular % of overall assignment (summing up to 70%). Implement those components as required to receive the marks.</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td>Mobile Responsiveness</td>
		<td>10%</td>
		<td>
			<ul>
				<li>Your application is usable for desktop sizes generally, tablet sizes generally, and mobile sizes generally (down to 400px wide, 700px high).</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td>Code Style</td>
		<td>10%</td>
		<td>
			<ul>
				<li>Your code is clean, well commented, with well-named variables, and well laid out.</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td>Usability & Accessibility</td>
		<td>10%</td>
		<td>
			<ul>
				<li>Your application is usable and easy to navigate. No obvious usability issues or confusing layouts/flows.</li>
				<li>Your application follows standard accessibility guidelines, such as use of alt tags, and colours that aren't inaccessible.</li>
			</ul>
		</td>
	</tr>
</table>

## 6. Originality of Work

The work you submit must be your own work.  Submission of work partially or completely derived from
any other person or jointly written with any other person is not permitted.

The penalties for such an offence may include negative marks, automatic failure of the course and
possibly other academic discipline. Assignment submissions will be examined both automatically and
manually for such submissions.

Relevant scholarship authorities will be informed if students holding scholarships are involved in
an incident of plagiarism or other misconduct.

Do not provide or show your assignment work to any other person &mdash; apart from the teaching
staff of COMP6080.

If you knowingly provide or show your assignment work to another person for any reason, and work
derived from it is submitted, you may be penalized, even if the work was submitted without your
knowledge or consent.  This may apply even if your work is submitted by a third party unknown to
you.

Every time you make commits or pushes on this repository, you are acknowledging that the work you
submit is your own work (as described above).

Note you will not be penalized if your work has the potential to be taken without your consent or
knowledge.

**For students who completed COMP2041 in 2018**, this assignment is very similar to another you would 
have completed. Please remember that UNSW plagiarism guidelines prevent you from using your previous work
in other courses. This means you must complete this assignment without using/copying any code from
other assignments. Generally though, this should be OK, as since it's been quite a while since COMP2041
I am sure many students will not want to reuse their approaches from less-knowledgable selves.

## 7. Submission

This assignment is due *Monday 26th of October, 19:59:59*.

Our systems automatically record the most recent push you make to your `master` branch. Therefore,
to "submit" your code you simply need to make sure that your `master` branch (on the gitlab website)
is the code that you want marked for this task.

## 8. Late Submission Policy

If your assignment is submitted after this date, each hour it is late reduces the maximum mark it can achieve by 2%.

For example if an assignment you submitted with a raw awarded mark of 85% was submitted 5 hours late, the late submission would have no effect (as maximum mark would be 90%). If the same assignment was submitted 20 hours late it would be awarded 60%, the maximum mark it can achieve at that time.

## 9. FAQ

Q. Is the dummy Anon user initially following anyone?
A. No, you will need to manually follow people in order to get `GET /dummy/user/feed` returning something useful