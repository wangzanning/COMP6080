const numbers = [406, 646, 199, 996, 989, 47, 55, 614, 293, 407, 287, 605, -56, 960, 832, 25, 596, 541, -577, 56, 878, 483, 681, 17, 73, 428, -757, 923, 748, 619, 117, 588, -661, -267, 571, 95, 923, 386, 507, 243, -868, -797, 344, 660, 34, 945, -424, -169, 344, 601, 277, 478, 562, 863, 887, 172, 23, 995, 999, 2, 12, 476, 755, 617, 155, 698, 91, 1, 481, 971, 371, 164, 220, 854, 590, 364, 446, 254, 980, 469, 738, 866, 297, 410, 407, 576, 893, 319, 866, 501, 939, 536, 380, 331, 438, 76, 423, 951, 459, 425 ];

// The sum of all numbers in that list
var sum = eval(numbers.join("+")) 
console.log("sum = " + sum);

// The sum of only positive numbers in that list
function checkPositive(number) {
	if (number > 0) {
		return number;
	}
}
var positiveList = numbers.filter(checkPositive);
var positiveSum = eval(positiveList.join("+"));
console.log("Positive Sum = " + positiveSum);

// The sum of only even numbers in that list
function checkEven(number){
	if (number % 2 == 0){
		return number;
	}
}
var evenList = numbers.filter(checkEven);
var evenSum = eval(evenList.join("+"));
console.log("Even Sum = " + evenSum);

// The sum of all numbers above 400
function checkOver400(number){
	if (number > 400){
		return number;
	}
}
var over400List = numbers.filter(checkOver400);
var over400Sum = eval(over400List.join("+"));
console.log("Sum of numbers above 400 = " + over400Sum);

// The sum of numbers between array index 20 and 40 inclusively
var indexList = [];
for (var i=20; i <=40; i++){
	indexList.push(numbers[i])
}
var indexSum = eval(indexList.join("+"));
console.log("Sum of numbers between indexes 20 and 40 inclusively = " + indexSum);

