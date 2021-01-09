// z5224151 ZANNING WANG
// 2020.09.30 Wednesday
// Lab03-exercise5-part2
//Time format used in this exercise: 'YYYY-MM-DD HH:mm:ss'

//import package
var moment = require('moment');

//first question:
today = moment().format('YYYY-MM-DD HH');
firstDay = moment().startOf("day").format('YYYY-MM-DD HH');
startTime = moment(today,"YYYY-MM-DD HH");
endTime = moment(firstDay,"YYYY-MM-DD HH");
firstQuestion = startTime.diff(endTime,"hours");

//second, third qusetions:
nextWeek = moment().add(1, "week").calendar();
var secondQuestion = moment(nextWeek,'MM/DD/YYYY').format('dddd');
var thridQuestion = moment().format('LT');

//fourth question:
var fourthQuestion = moment().format("DD/MM/YYYY");

//fifth question:
//get the firstday of this week and add 5 days and 9 hours and calculate the difference
firstDay = moment().startOf("week").format('YYYY-MM-DD HH');
friday = moment(firstDay).add(5, "days").format('YYYY-MM-DD HH');
friday9am = moment(friday).add(9, "hours").format('YYYY-MM-DD HH');
startTime = moment(today,"YYYY-MM-DD HH");
endTime = moment(friday9am,"YYYY-MM-DD HH");
fifthQuestion = endTime.diff(startTime,"seconds");

//print the result
console.log("The day started ["+firstQuestion+"] hours ago. One week ago it was ["+secondQuestion+"] at ["+
    thridQuestion+"]. Today's date is ["+fourthQuestion+"]. " + "There are exactly ["+fifthQuestion+
    "] seconds until 9am on Friday.");


