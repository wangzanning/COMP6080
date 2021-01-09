/* There is no perfect solution to this problem. There are a number of valid, decent solutions, and many of them might be quite dissimilar from yours. This code is one of many good solutions, and was written by Kaiqi Liang (z5210932), a student in 20T3 */

const numbers = [406, 646, 199, 996, 989, 47, 55, 614, 293, 407, 287, 605, -56, 960, 832, 25, 596, 541, -577, 56, 878, 483, 681, 17, 73, 428, -757, 923, 748, 619, 117, 588, -661, -267, 571, 95, 923, 386, 507, 243, -868, -797, 344, 660, 34, 945, -424, -169, 344, 601, 277, 478, 562, 863, 887, 172, 23, 995, 999, 2, 12, 476, 755, 617, 155, 698, 91, 1, 481, 971, 371, 164, 220, 854, 590, 364, 446, 254, 980, 469, 738, 866, 297, 410, 407, 576, 893, 319, 866, 501, 939, 536, 380, 331, 438, 76, 423, 951, 459, 425 ];

console.log('List of negatives =', numbers.filter(number => number < 0));

const positives = numbers.filter(number => number > 0 && number % 6 === 0);
const sum = positives.reduce((previous, current) => previous + current);
console.log('Average of positive numbers 6 divisible =', sum / positives.length);

console.log('List of large numbers in reverse =', numbers.filter(number => number > 600).reverse());
