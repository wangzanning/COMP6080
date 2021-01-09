// z5224151	ZANNING WANG
// 2020.09.28 Monday
// Lab03-exercise2

//append tag <p>
var pNode = document.createElement("p");
var pNodeText = document.createTextNode("Hello there,");
pNode.appendChild(pNodeText);
document.getElementById("body").appendChild(pNode);

var pNode = document.createElement("p");
var pNodeText = document.createTextNode("I am a llama, hear my sirens roar:");
pNode.appendChild(pNodeText);
document.getElementById("body").appendChild(pNode);

//add tag <ul>
var ulNode = document.createElement("ul");
var Node = document.createElement("li");
var nodeText = document.createTextNode("The");
Node.appendChild(nodeText);
ulNode.appendChild(Node);

var Node = document.createElement("li");
var nodeText = document.createTextNode("Duck");
Node.appendChild(nodeText);
ulNode.appendChild(Node);

var Node = document.createElement("li");
var nodeText = document.createTextNode("Lemonade");
Node.appendChild(nodeText);
ulNode.appendChild(Node);

var Node = document.createElement("li");
var nodeText = document.createTextNode("Stand");
Node.appendChild(nodeText);
ulNode.appendChild(Node);

document.getElementById("body").appendChild(ulNode);