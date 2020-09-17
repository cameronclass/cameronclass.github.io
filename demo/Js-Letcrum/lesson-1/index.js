var age = 23;
console.log(typeof age);


// как можно работать с деньгами
const a = 0.3;
const b = 0.4;

/* const sum = a + b; */
const sum = (a * 10 + b * 10) / 10;
console.log(sum);

// склеивание строк
const name = 'Cameron';
const surname = 'Class';

const show_name = name + ' ' + surname;
const show_name_es6 = `Mr. ${name} ${surname}`;
console.log(show_name);
console.log(show_name_es6);

// Оператовы
let n = 1;

console.log(++n); //пре инкремент
console.log(n++); //пост инкремент
console.log(n);


// условные операторы

const Name = "CameronClass";

if (name) {
  console.log(name);
} else {
  console.log("False");
}

if (Name) {
  if (name === "cameron") {
    console.log(name);
  } else {
    console.log("False");
  }
} else {
  console.log("indefined");
}

switch (surname) {
  case "CameronClass":
    console.log(Name);
    break;
  case "Cameron":
    console.log("Just Name");
    break;
  case "class":
    console.log("Just Surname");
    break;
  default:
    console.log("Not defined");
    break;
}