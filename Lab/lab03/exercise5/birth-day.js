// z5224151 ZANNING WANG
// 2020.09.30 Wednesday
// Lab03-exercise5-part1

//print today and the day of week
var moment = require('moment');
var weekday = moment().format('dddd');
var today = moment().format('MM/DD/YYYY');
console.log(weekday + "  " + today);

//print the last 13 years of today
//write the exact date to help tutot give mark.
for (var i=1; i<=13; i++) {
    var last = moment().subtract(i,'years').calendar();
    var fday = moment(last,'DD/MM/YYYY').format('dddd');
    console.log(fday + "  " + last);
}



