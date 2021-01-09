# Assessment 3 - ReactJS: BigBrain

1. Background & Motivation
2. The Task (Frontend)
3. The Support (Backend)
4. Constraints & Assumptions
5. Teamwork
6. Marking Criteria
7. Originality of Work
8. Submission
9. Late Submission Policy
10. FAQ

## 0. Change Log

* 31/10: Clarity on how to yarn install added to top of section 2. Clarity on how bonus marks bleed.
* 31/10: Moving `config.json` from `frontend` to `frontend/src`
* 01/11: Swagger doc complete and many routes fixed. Final items implemented. Interface on previously incomplete routes changed slightly (Admin deleting a quiz; admin "advancing" to next question; player joining has a name)
* 01/11: Addition of information on `backend/src/customer.js` as a means to wrapping your custom data structure. Explained in `2.9`.
* 01/11: (Backend adjustments) Addition of `thumbnail` and `name` to `PUT /admin/quiz/:quizid`. Addition of `thumbnail` to `GET /admin/quiz` and `GET /admin/quiz/:quidid`.
* 03/11: (Backend adjustments) Changed the "active" field of the quiz object to be either the Session ID of an active session, or null if no section is active. Previously it was a boolean which wasn't very useful.
* 03/11: (Backend adjustments) Invalid routes now return HTTP 404; Correction on how multiple answers are dealt with in custom.js; assertOwnsQuiz correctly working.
* 05/11: Added "This login button, when clicked, returns you to the login screen." to `2.1.3`. Removed "The time it took them to complete each question" from `2.4.3`
* 07/11: "QuizId.Active" now correctly returns an integer (instead of string). "quizId" on `GET /admin/quiz/{quizid}/start` removed from swagger docs to be consistent with implementation; fixed bug where timeout was not working correctly with seconds; session status endpoint swagger doc updated to reflect return type; returning questions instead of numQuestions (as you can get length from it); Removing authorisation from play routes; Correct return for `GET /play/:playerid/results` provided; Added `oldSessions` property to quiz object return.
* 08/11: Correctly named response object for `GET /play/{playerid}/answer` to `answerIds`
* 09/11: Section on "Testing" criteria updated.
* 10/11: Reminder that `2.5` is NOT bonus features; Non-null return type when user hasn't answered anything
* 11/11: Upon request, added 'isoTimeLastQuestionStarted' property to `GET /play/{playerid}/question` so that you can display a countdown / remaining timer on the frontend
* 12/11: Added `answeredAt` property to results, to complete various sections; Clarity that only 3 components need to be tested; We encourage you to only use shallow component rendering; Question started time added to overall results payload for each user
* 15/11: Added `/play/{playerid}/status` to allow a player to tell if the game has started or not - not required to be used, someone just asked for it
* 20/11: Made clear that 'Updates the thumbnail and name of the game successfully (yes, it will have no questions)' is not required
* 20/11: Recommendation to put a `TESTING.md` file in the project repo with information about your tets if you feel they need some explanation 

## 1. Background & Motivation

In October 2020 you and your friends pitched a startup idea to produce *An innovative lightweight quiz platform for millenials* that will *revolutionise the secondary and tertiary education market for years*. You pitched this solution in the form of a web-based application, and called this quiz application **BigBrain**.

A week later you received a tentative $50,000 investment from an [Angel Investor](https://en.wikipedia.org/wiki/Angel_investor) pending you producing a working MVP of the application.

Shortly after you discussed the functionality and feature set with your friends, and wrote out a RESTful specification / interface together so that you can split up the front-end and back-end work between the group.

You (and optionally another one of your friends) decided to work on building the front-end. You wrote a list of requirements and functionalities your frontend should adhere to (described in `section 2`). You also decided to complete this application in `ReactJS`, a declarative framework for building single page applications. This front-end will interact with a Restful API that your team members are producing, based on the pre-defined interface.

Because your MVP is only going to be demonstrated once, your team considers it imperative that your front-end is thoroughly tested.

To satisfy modern tastes and expectations you have also decided to ensure that the UI/UX and Accessibility standards are very high.

**This assignment is the process you building the front-end for that MVP to the standards described.** This assignment is closely modelled off the popular game [kahoot](https://kahoot.com/). If you're not familiar with the game, we would recommend spending the time to try it out so that you can get a feel for how this application may function.

## 2. The Front-end (Work to do)

Navigate to the `frontend` folder and run `yarn install` to install all of the dependencies necessary to run the ReactJS app. Then run `yarn start` to start the ReactJS app.

A series of features below need to be implemented in your ReactJS app to operate in conjunction with the backend (section 3).

### 2.1. Feature 1. Admin Auth (10%)

#### 2.1.1. Login Screen
 * A unique route must exist for this screen
 * User must be able to enter their `email` and `password`.
 * If the form submission fails, a reasonable error message is shown
 * A button must exist to allow submission of form

#### 2.1.2. Register Screen
 * A unique route must exist for this screen
 * User must be able to enter their `email` and `password` and `name`
 * A button must exist to allow submission of form

#### 2.1.3. Logout Button
 * On all screens that require an authorised user, a logout button exists.
 * This logout button, when clicked, returns you to the login screen.

### 2.2. Feature 2. Admin Creating & Editing a Game (20%)

#### 2.2.1. Dashboard_old
 * A unique route must exist for this screen
 * A dashboard of all games is displayed, where each game shows the title, number of questions, a thumbnail, and a total time to complete (sum of all individual question times)
 * Each game listed should have a clickable element relating to it that takes you to the screen to edit that particular game
 * A button exists on this screen that allows you to create a new game, provided a name for the game. Clicking it creates a new game on the server and adds another visible game to the dashboard.
 ** A button exists on this screen that allows you to delete a particular game.

#### 2.2.2. Edit BigBrain Game
 * A unique route must exist for this screen that is parameterised on the game ID
 * This screen allows users to select the question they want to edit
 * This screen allows users to delete a particular question, or add a new question

#### 2.2.3. Edit BigBrain Game Question
 * A unique route must exist for this screen that is parameterised both on the Game ID and the question ID
 * Editable items on this page include:
   * The question type (multiple choice, single choice)
   * The question itself (as a string)
   * Time limit that users have to answer the question
   * Points for how much the question is worth
   * The ability to optionally attach a URL to a youtube video, or upload a photo, to enhance the question being asked).
   * Anywhere between 2 and 6 answers, that each contain the answer as a string

### 2.3. Feature 3. Admin Start, Stop, Results of game (10%)

#### 2.3.1. Starting a game
 * On the dashboard page, add the ability to start a stopped game
 * When the game is started, a popup is displayed that shows the session ID of the game as a string
 * This session idea should be able to be copied by some kind of "Copy Link" button/element. When this item is clicked, a direct URL is copied to the clipboard. When going to this URL, the users should be given play screen (described in `2.4`) with the session code already pre-populated.

#### 2.3.2. Stopping a game
 * On the dashboard page, the ability to stop a started game.
 * When the game is stopped, a popup appears that prompts the admin "Would you like to view the results?" If they click yes, they are taken to the screen described in `2.3.3`

#### 2.3.3. Getting the results of a game
 * A unique route must exist for this screen that is parameterised on the session ID
 * Once the screen loads, it should display the following:
   * Table of up to top 5 users and their score
   * Bar/Line chart showing a breakdown of what percentage of people (Y axis) got certain questions (X axis) correct
   * Some chart showing the average response/answer time for each question
   * Any other interesting information you see fit

### 2.4. Feature 4. Player able to join and play game (10%)

#### 2.4.1. Play Join
 * A unique route must exist for this screen
 * A user is able to enter a session ID and their own name to attempt to join the session. If succesful, they're taken to `2.4.2`.

#### 2.4.2. Play Game
 * On this screen the user is given the current question being asked. This consists of:
   * The question text
   * A video or image depending on whether it exists.
   * A countdown with how many seconds remain until you can't answer anymore.
   * A selection of either single or multiple answers, that are clickable.
 * The answer shall be sent to the server the moment the user starts making selections. If further selections are modified, more requests are sent
 * When the timer hits 0, the answer/results of that particular question are displayed
 * The answer screen remains visible until the admin advances the quiz question onto the next question.

#### 2.4.3. Game Results
 * After the final question is answered, a page is displayed showing the key results:
   * The player's performance in each question

### 2.5. Advanced Features (10%) (THIS IS NOT BONUS FEATURES)
 * For `2.2.1`, when a new game is created, the user can optionally upload a .csv or .json (you choose) file containing the full data for a game. The data structure is validated on the frontend before being passed to the backend normally. You should provide a copy of an example data file in your project repo.
 * If you implement this feature, you must attach an example .csv or .json into your repo in the project folder. This file must have name `2.5.json`  or `2.5.csv`. This is so we can actually test that it works while marking.

### 2.6. Linting

* Linting must be run from inside the `frontend` folder by running `yarn lint`.

### 2.7. Testing

As part of this assignment you are required to write some tests for your components (component testing), and for your application as a whole (ui testing).

For **component testing**, you must:
 * Write tests for at least 3 different components
 * For each of the 3 components, they mustn't have more than 50% similarity (e.g. you can't test a "Card" component and a "BigCard" component, that are virtually the same)
 * Ensure your tests have excellent **coverage** (look at all different use cases and edge cases)
 * Ensure your tests have excellent **clarity** (well commented and code isn't overly complex)
 * Ensure your tests are **designed** well (logical ordering of tests, avoid any tests that aren't necessary or don't add any meaningful value)
 * (We encourage you to only use shallow component rendering)

For **ui testing**, you must:
 * Write a single test for the "happy path" of an admin that is described as:
   1. Registers successfully
   2. Creates a new game successfully
   3. (Not required) Updates the thumbnail and name of the game successfully (yes, it will have no questions)
   4. Starts a game successfully
   5. Ends a game successfully (yes, no one will have played it)
   6. Loads the results page successfully
   7. Logs out of the application successfully
   8. Logs back into the application successfully

Tests must be run from inside the `frontend` folder by running `yarn test`.

We recommend (not required) putting put a `TESTING.md` file in the project repo with information about your tets if you feel they need some explanation.

### 2.8. General Requirements
 * Any routes you create must be intelligently and justifiably named.

### 2.9. Other notes
 * The port you can use to `fetch` data from the backend is defined in `frontend/src/config.json`
 * The data structure of a "question" is open ended - it's not defined explicitly in the backend. Because of this, the backend has 3 wrapper functions defined in `backend/src/custom.js` that it uses to extract meaning from your custom data structure. You will have to implement these as you build out your frontend.
* For users of typescript, there is an alternatively `.eslintrc` file [being collaborated here](https://hackmd.io/sy1urGgxRpGwOJ0nOkNlUw?both). Do not change it unless given approval on forum.

## 3. The Back-end (Provided - no work required)

The backend server exists in your individual repository. After you clone this repo, you must run `npm install` in the project directory once.

To run the backend server, simply run `npm run backend` in the project directory. This will start the backend.

Your backend is persistent in terms of data storage. That means the data will remain even after your express server process stops running. If you want to reset the data in the backend, you can run `npm run reset`. If you want to make a copy of the backend data (e.g. for a backup) then simply copy `database.json`.

Once the backend has started, you can view the API documentation by navigating to `http://localhost:[port]` in a web browser.

**The backend is only stubbed for the time being. The routes function, though return 200 with no payload. This will change by the end of the first week**

The port that the backend runs on (and that the frontend can use) is specified in `frontend/src/config.json`.

An insomnia config can be found, and will be updated, [here](http://www.cse.unsw.edu.au/~cs6080/20T3/assignments/ass3/insomnia.json).

## 4. Constraints & Assumptions

 * You must implement this assignment in ReactJS. You cannot use other declarative frameworks, such as AngularJS, or VueJS.
 * You must use ReactJS solutions wherever possible, and avoid doing any direct DOM manipulation unless completely avoidable.
 * You can use any CSS libraries that you would like, such as bootstrap or material-ui.
 * You should ensure that your programs have been tested on one of the following two browsers:
   * Locally, Google Chrome (various operating systems) version 85.XX
   * On CSE machines, Chromium version 83.XX
 * You may use small amounts (&lt; 10 lines) of general purpose code (not specific to the assignment) obtained from a site such as Stack Overflow or other publically available resources. You should attribute clearly the source of this code in a comment with it. You can not otherwise use code written by another person.
 * The specification is intentionally vague to allow you to build frontend components however you think are visually appropriate. Their size, positioning, colour, layout, is in virtually all cases completely up to you. We require some basic criteria, but it's mainly dictating elements and behaviour.
 * Besides those described to avoid, you may use any other packages available on npm/yarn.

## 5. Teamwork

This assignment may be completed in a team of two (pair). However, you are also welcome to complete it on your own, if you choose. Please note:
 * There is no lowered expectations for students working on their own - you will be assessed the same as the pairs
 * You are able to pair with any student in the course, they aren't required to be in your tutorial slot

**If you are looking for a team member**, you are welcome to use [this piazza post](https://piazza.com/class/kdxbnhfpob74y0) to find yourself a team member. If you already have a team member then that's fine, too. If you need to find a team member but can't find them, and the forum isn't working for you, email cs6080@cse.unsw.edu.au.

**Once you have chosen your team member**:
 * Have one of you add the other person to your ass3 gitlab repository. You can do this by going to Settings > Members and then adding them there. You will both continue to work on one repository, and the other repository will just stay untouched.
 * [complete this form so that we know who is paired, so we can mark you correctly.](https://forms.office.com/Pages/ResponsePage.aspx?id=pM_2PxXn20i44Qhnufn7o_RvPhdrUs1DpZ0MlMs_Bf1UMUQ1ODJSVDRLUElZUVJEMElPWTZVWlhYNi4u)

Your team must be selected by *5pm Monday the 2nd of November*. If you are not in a pair by then, you will be unable to be in one for the duration.

Once you form a team, you will be unable to leave your team. You will be assessed together for the assignment.

If your contributions to the assignment are not approximately equal, then the teaching staff may make discretionary calls based on your gitlab history to award different marks to each student.

If you share code with any COMP6080 student outside of your registered team member above, it constitutes plagiarism and will result in a 0 for the assignment.

## 6. Marking Criteria

Your assignment will be hand-marked by tutor(s) in the course according to the criteria below.

<table>
	<tr>
		<th>Criteria</th>
		<th>Weighting</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Functionality of the Feature Set + Mobile Responsiveness</td>
		<td>60%</td>
		<td>
			<ul>
				<li>Features implemented that satisfy requirements as outlined in `2.1`, `2.2`, `2.3`, `2.4`, and `2.5`.</li>
				<li>Features implemented in a mobile responsive way that work on screens as small as 400px wide, 700px high</li>
				<li>Responsive design will contribute up to one quarter of the marks of this section</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td>Linted Code</td>
		<td>5%</td>
		<td>
			<ul>
				<li>Submitted code is completely `eslint` compliant based on provided eslint configuration file.</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td>Code Style</td>
		<td>10%</td>
		<td>
			<ul>
				<li>Your code is clean, well commented, with well-named variables, and well laid out.</li>
				<li>Code follows common ReactJS patterns that have been discussed in lectures</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td>Testing</td>
		<td>15%</td>
		<td>
			<ul>
				<li>Two thirds (10%) of the marks received from complying with requirements in section `2.7` in relation to **component testing**</li>
				<li>One third (5%) of the marks received from complying with requirements in section `2.7` in relation to **ui testing**</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td>UI/UX & Accessibility</td>
		<td>10%</td>
		<td>
			<ul>
				<li>Your application is usable and easy to navigate. No obvious usability issues or confusing layouts/flows.</li>
				<li>Your application makes intelligent use of UI/UX principles and patterns discussed in the UI/UX lectures.</li>
				<li>Your application follows standard accessibility guidelines, such as use of alt tags, and colours that aren't inaccessible.</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td>(Bonus Marks) Extra Features</td>
		<td>10%</td>
		<td>
			<ul>
				<li>Implementation of extra features that are not included in the spec.</li>
				<li>Extra features should be non-trivial, have a clear justification for existing, and show either a form of technical, product, or creative flare.</li>
				<li>Any extra features written down in `extra.md` in the project folder</li>
				<li>Any bonus marks that extend your ass3 mark above 100% will bleed into other assignment marks, but cannot contribute outside of the 60% of the course that is allocated for assignment marks</li>
			</ul>
		</td>
	</tr>
</table>

## 7. Originality of Work

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

## 8. Submission

This assignment is due *Sunday 22nd November, 19:59:59*.

Our systems automatically record the most recent push you make to your `master` branch. Therefore,
to "submit" your code you simply need to make sure that your `master` branch (on the gitlab website)
is the code that you want marked for this task.

## 9. Late Submission Policy

If your assignment is submitted after this date, each hour it is late reduces the maximum mark it can achieve by 2%.

For example if an assignment you submitted with a raw awarded mark of 85% was submitted 5 hours late, the late submission would have no effect (as maximum mark would be 90%). If the same assignment was submitted 20 hours late it would be awarded 60%, the maximum mark it can achieve at that time.

## 10. FAQ

N/A
