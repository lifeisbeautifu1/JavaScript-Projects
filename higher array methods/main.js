console.log("Hello there :)");

const arr = [];
for (i = 0; i < 20; ++i) {
  arr.push(Math.ceil(Math.random() * 100));
}

// map
// filter
// =>
// foreach
// reduce
// sort

// sort in increasing order
arr.sort(function (a, b) {
  return a - b;
});

console.log(arr);

// sort decreasing order
arr.sort((a, b) => b - a);
console.log(arr);

// create array of only even numbers in arr
const evenNumbers = arr.filter(function (number) {
  return number % 2 === 0;
});

console.log(evenNumbers);

// array of odd numbers
const oddNumbers = arr.filter((num) => num % 2 === 1);
console.log(oddNumbers);

// create array of numbers squared minus one form arr
const newArray = arr.map(function (num) {
  return num * num - 1;
});

console.log(newArray);

const secondArray = [
  {
    name: "Bob",
    secondName: "Bobbins",
    age: 19,
  },
  {
    name: "Carlos",
    secondName: "Carlins",
    age: 21,
  },
  {
    name: "Tommy",
    secondName: "Tommins",
    age: 12,
  },
  {
    name: "Patrick",
    secondName: "Blum",
    age: 15,
  },
  {
    name: "Samuel",
    secondName: "Good",
    age: 30,
  },
];

// sort secondArray by age

secondArray.sort(function (a, b) {
  return a.age - b.age;
});
console.log(secondArray);

// Create array of peoople with age over 18 and second array consist of theirs name

const overEighteen = secondArray.filter(function (person) {
  return person.age >= 18;
});
console.log(overEighteen);

const namesOverEighteen = overEighteen.map(function (person) {
  return person.name;
});

console.log(namesOverEighteen);

// and add their age together

const totalAge = overEighteen.reduce(function (total, person) {
  return total + person.age;
}, 0);

console.log(totalAge);
