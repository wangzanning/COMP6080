// z5224151	ZANNING WANG
// 2020.09.30   Wednesday
// Lab03-exercise3

//inital the background image
var imgNode = document.createElement("img");
var aNode = document.createElement("a");
var divNode = document.createElement("div");
aNode.appendChild(imgNode);
imgNode.src = "https://i.ytimg.com/vi/yJiVZUKAS84/maxresdefault.jpg";
imgNode.alt = "Me and my sibling";
aNode.target = "_blank";
aNode.href = "https://google.com";

//change the background color from black to yello or we can not see excel below
divNode.style.background = "#DDD12D";
divNode.appendChild(aNode);
document.getElementById("body").appendChild(divNode);

//element hr
var hrNode = document.createElement("hr");
divNode.appendChild(hrNode);

//element table
var tableNode = document.createElement("table");
divNode.appendChild(tableNode);

//first row
var trNode = document.createElement("tr");
tableNode.appendChild(trNode);

var thNode = document.createElement("th");
var textNode = document.createTextNode("Name");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

var thNode = document.createElement("th");
var textNode = document.createTextNode("Age");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

var thNode = document.createElement("th");
var textNode = document.createTextNode("Height");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

//second row
var trNode = document.createElement("tr");
tableNode.appendChild(trNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("Sarah");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("22");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("188");
thNode.appendChild(textNode);
trNode.appendChild(thNode);
//thrid row
var trNode = document.createElement("tr");
tableNode.appendChild(trNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("Lin");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("42");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("134");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

//fourth row
var trNode = document.createElement("tr");
tableNode.appendChild(trNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("Samir");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("21");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("155");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

//fifth row
var trNode = document.createElement("tr");
tableNode.appendChild(trNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("Wanye");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("29");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("162");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

//Sixth row
var trNode = document.createElement("tr");
tableNode.appendChild(trNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("Eckhart");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("112");
thNode.appendChild(textNode);
trNode.appendChild(thNode);

var thNode = document.createElement("td");
var textNode = document.createTextNode("144");
thNode.appendChild(textNode);
trNode.appendChild(thNode);