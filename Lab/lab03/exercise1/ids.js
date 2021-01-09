// z5224151	ZANNING WANG
// 2020.09.28 Monday
// Lab03-exercise1

var uuidList = [];
var allStr = '';
for (var i=0; i <30; i++){
	var UUID = require('uuid');
	var outputID = UUID.v4();
	allStr += outputID;
	uuidList.push(outputID);
}

// print the uuid in order
var sortList = uuidList.sort();
for (var i=0; i <30; i++){
	console.log(sortList[i]);
}

// remove the duplcate from all strings
var noDuplcate = '';
for (var i = 0; i < allStr.length; i++){
	if (noDuplcate.lastIndexOf(allStr[i]) == -1){
		noDuplcate += allStr[i];
	}
}

// get the count of each character
var dic = new Array();
for (var i = 0; i < noDuplcate.length; i++) {
	var counter = 0;
	for (var j = 0; j < allStr.length; j++) {
	 	if (noDuplcate[i] == allStr[j]){
	 		counter++;
	 	}
	}
	dic[noDuplcate[i]] = counter;
}

// remove "-" from dic
delete dic['-'];

// sort by value in counter to get the new key
var newkey = Object.keys(dic).sort(function(key1,key2){
 	return dic[key2]-dic[key1];
 })
// console.log(newkey);
// print top 5
var outputCount = '';
for (var i=0; i<5 ;i++){
	outputCount += newkey[i] + " ";
}
console.log(outputCount);

// show the detail number
// for (var key in dic){
// 	console.log(key +':'+ dic[key]);
// }



