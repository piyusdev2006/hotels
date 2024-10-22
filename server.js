
// const fs = require('fs');
// const os = require('os');
// const loadsh = require('lodash');
const express = require("express");
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Building my first web server with Node.js");
});

app.get("/about", (req, res) => {
    res.send("About: Hey there everyone!, Naveen here..running a restaurant.");
});

app.get("/menu", (req, res) => {
    let items = {
        "starter": "Paneer Butter Masala",
        "main course": "Kadai Paneer",
        "dessert": "Gulab Jamun",
        "drinks": "Tea",
    }
    res.send(items);          
});

app.get("/contact", (req, res) => {
    res.send("Contact: 1234567890");
});






// import the router files
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);



const menuItemRoutes = require("./routes/menuItemRoutes");
app.use("/menuItem", menuItemRoutes);


// here the server listen to port 3000
app.listen(3000 , () => {
    console.log("\n Server started on port 3000");
});







// let user = os.userInfo();
// // console.log(user);
// console.log(user.username);

/*
fs.appendFile('greeting.txt', 'Hi' + user.username + '!\n', (err) => {
    console.log("File created successfully");
});
*/



// console.log(os);
// console.log(fs);





// check code
// console.log("Hello from server.js");


// Normal Function
/* 
function sleep() {
    console.log("Hello from sleep function");
}
sleep();


const eat = function () {
    console.log("Hello from eat function");
}
eat();
*/


// arrow Function
/*
const code = () => {
    console.log("Hello from code function");    
}
code();
*/


// Immediately Invoked Function Expression
/*
(function () {
    console.log("Hello from IIFE");
})();
*/


// callback function


/* 
function callback() {
    console.log("Hello from callback function");
} 

const add = function (a, b, callback) {
    const sum = a + b;
    callback(sum);
}

add(2, 3, callback);
*/


function callback(sum) {
    console.log("Calling from a callback function :",sum);
}

const add = function (a, b, callback) {
    const sum = a + b;
    callback(sum);
}

add(2, 3, callback);


// callback function with arrow function

const sub = (a, b, callback) => {
    const sum = a + b;
    callback(sum);
}

sub(2, 3, sum => console.log("Sum of two numbers is : ", sum));


// loadsh library

// let data = loadsh.filter([1, 2, 3, 4, 5], x => x > 3);
// console.log(data);

// let arrData = [1, 2, 3, 3,5, "naveen", 4, 2, "true", 4, 5];
// let data = loadsh.uniq(arrData);
// console.log(data);


// console.log(loadsh.isString("naveen"));
// console.log(loadsh.isString(2));



// JSON - JavaScript Object Notation , it is a type of string and it is a format to store data in js language also called as object data type

// console.log("\n",typeof JSON, "\n");



// given json string and convert it to jsonobject

// const jsonString = '{"name": "John", "age": 30, "city": "New York", "hasChildren": false, "address": {"street": "123 Main St", "city": "New York", "state": "NY"}}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject);
// console.log(jsonObject.address.city ,"\n");



// given json object and convert it to json string

// const persons = {
//     name: "John",
//     age: 30,
//     address: {
//         street: "123 Main St",
//         city: "New York",
//         state: "NY"
//     }
// };
// const jsonString2 = JSON.stringify(persons);
// console.log(jsonString2);