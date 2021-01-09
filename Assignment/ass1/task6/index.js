//check the first name legal
function checkFirstName() {
    var firstName = formbox.fname;
    var pattern = new RegExp("[A-Za-z]+");
    var firstNameValue = formbox.fname.value;
    var nameLenght = formbox.fname.value.length;
    if (firstName.value == "" || !(pattern.test(firstNameValue)) || nameLenght > 50 || nameLenght < 3) {
        document.getElementById("outputText").innerHTML="Please input a valid firstname";
    }else {
        document.getElementById("outputText").innerHTML="";
    }
}
//check the last name legal
function checkLastName() {
    var lastName = formbox.lname;
    var pattern = new RegExp("[A-Za-z]+");
    var lastNameValue = formbox.lname.value;
    var nameLenght = formbox.lname.value.length;
    if (lastName.value == "" || !(pattern.test(lastNameValue)) || nameLenght > 50 || nameLenght < 3) {
        document.getElementById("outputText").innerHTML="Please input a valid lastname";
    }else {
        document.getElementById("outputText").innerHTML="";
    }
}
function checkDate() {
    // var moment = require('moment');
    var dateTime = formbox.datebirth.value;
    var pattern = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}");
    // var validDate = moment(dateTime,'DD/MM/YYYY').isValid();
    // document.getElementById("outputText").innerHTML= validDate;
    // var year = dateTime.match(/[0-9]{4}$/);
    // var month = dateTime.match(/\/[0-9]{2}\//);
    // var month = month.match(/[0-9]{2}/);
    // var day = dateTime.match(/^[0-9]{2}/);
    // var realDay = day + "/" + month + "/" + year;
    if (! pattern.test(dateTime)){
        document.getElementById("outputText").innerHTML="Please enter a valid date of birth";
    }else {
        document.getElementById("outputText").innerHTML="";
    }
}
function printResult() {
    var outPutText = "";
    var name = formbox.fname.value + " " + formbox.lname.value;
    var animal = formbox.animals.value;
    //print the age
    var dateTime = formbox.datebirth.value;
    var year = dateTime.match(/[0-9]{4}$/);
    var age = 2020-year;
    //get the values of checkbox
    var city = formbox.cities;
    var citiesValue = new Array();
    for (var i=0; i<city.length;i++){
        if (city[i].checked){
            citiesValue.push(city[i].value);
        }
    }
    //print the result with the different numbers of cities lived in
    if (citiesValue.length == 0){
        outPutText = "Hello" + name + " , you are " + age +" years old, your favourite animal is " + animal +
            ", and you've lived in no cities."
    }else {
        outPutText = "Hello " + name + " , you are " + age +" years old, your favourite animal is " + animal +
            ", and you've lived in " + citiesValue +"."
    }
    document.getElementById("outputText").innerHTML=outPutText;
}
//clear the boxareas
function clearBox() {
    document.getElementById("outputText").innerHTML="Keep Typing Bro!";
}