fs = require('fs');
const data = fs.readFileSync('data1.txt', 'utf8');

// // TODO Work below here
// console.log('The range is 421');

// console.log(data.split('\n'));

let lo = Infinity;
let hi = -Infinity;

for (const x of data.split('\n')) {
    // x is a string
    if (x === '') continue;
    const n = parseInt(x, 10);

    lo = Math.min(lo, n);
    hi = Math.max(hi, n);
}

console.log(`The rnage is ${hi - lo}`);