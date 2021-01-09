### <!--z5224151	ZANNING WANG-->

### <!--2020.10.15	Thursday-->

### <!--Lab05-exercise3-->

## In this part, I analysie the website: https://www.raywhite.com/

### for the problem of accessibility, by inspect the code and with the help of "Google light house", there are a few problems below:

1. ## ***Insufficient contrast radio***

   ### the background color and the foreground colors in the medium of the page (box content) do not have a sufficient contrast radio, for some of users, they may have difficult to read them.

   ### the way to solve that may change the color of the font and increase the font size a little bit, and with the help of "Chrome DevTools' color picker:" we can know the elements meets the color contrast requirement by the color picker

2. ## *Image without "alt" attribute*

   ### the IMG element do not have a "alt" attribute, for those who have difficulits read the website or the image lost due to the web connection, there should have a alt content to tell the users what the content the picture want to express. 

   ### the way to solve that can be just add a "ALT" attribute for the img tag. But not all IMG element shoud be add a "alt " attribute. Especially the  decorative elements should be ignored to help the assistive  technologies show the content. the effective "alt" text should use the decriptive content or give the intent, purpose and exact meaning, such as: "cute dog". 

3. ## *Same ARIA ID in some of elements*

   for exmaple:

   <input type="text" name="suburb" id="suburb" value="" placeholder="e.g. Sydney, Melbourne" class="ui-autocomplete-input" autocomplete="off">

   ### Using same ID on different element have proability effect the screen readers or other assistive technologies. The screen readers will only announce the first element with the same ID and ignore the content after.

   ### the way to improve the experience for the screen readers is to use the UNIQUE ID in our HTML.

4. ## *Add more navigation on centain element*

   ### Element such as "FIND OUT MORE" may add more navigation, such as increase the font size, to remind the user : there is a link to help you learn more. 

   ### What's more, all focusable element should add a unique ID for those who use the assistive technologise, or they can not navigate with certain element without the help of ID on that element.

## 5.  Increase the loading effiency

### 	This web use some of third-party code, which has blocked the main thread 	for 700ms and the webisite should not use the passive listeners to improve 	the effiency of scolling performence.