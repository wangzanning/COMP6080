import React from 'react';
import './App.css';

function App() {
  document.onkeydown = function (event) {
    var event = window.event?window.event:event;
    //left
    if (event.keyCode === 37){
    mergeLeft();
    addOneNode();
    updateHtmlCss();
    checkStatus();
    console.log("left");
    //up
    }else if (event.keyCode === 38){
    mergeUp();
    addOneNode();
    updateHtmlCss();
    checkStatus();
    console.log("up");
    //right
    }else if (event.keyCode === 39){
    mergeRight();
    addOneNode();
    updateHtmlCss();
    checkStatus();
    console.log("right");
    //down
    }else if (event.keyCode === 40){
    mergeDown();
    addOneNode();
    updateHtmlCss();
    checkStatus();
    console.log("down");
    }
  }
 
  //init the game
  window.onload = function () {
    gameInit();
  };
  //build a list to store figure
  var positionList = new Array();
  for (var i=0; i < 4; i++){
    positionList[i] = new Array();
    for (var j = 0; j < 4; j++){
      positionList[i][j] = 0;
    }
  }
  //generate one random number
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.ceil(max));
  };

  //initial the game
  function gameInit() {
    addTwoBegin();
    gameInitial();

  }
  //initial a 2 at left-top at the beginning
  function addTwoBegin() {
    positionList[0][0] = 2;
    updateHtmlCss();
  }

  function gameInitial() {
    updateHtmlCss();
  }
  //generate a 2 or 4
  function generateOneNumber() {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.ceil(max));
    };
    while (true) {
      var output = getRandomInt(5);
      if (output % 2 === 0 && output !== 0){
        break;
      }
    }
    return output;
  }
  //add 2 or 4 into an empty box
  function addOneNode() {
    let figure = generateOneNumber();
    while (true){
      let i = getRandomInt(4);
      let j = getRandomInt(4);
      if (positionList[i][j] === 0){
        positionList[i][j] = figure;
        break;
      }
    }
  }
  //function update background-color
  function updateBackgroundColor(figure) {
    switch (figure) {
      case 0:
        return "rgb(202,193,181)";
      case 2:
        return "rgb(233,228,219)";
      case 4:
        return "rgb(235,224,203)";
      case 8:
        return "rgb(232,180,129)";
      case 16:
        return "rgb(232,154,108)";
      case 32:
        return "rgb(230,131,103)";
      case 64:
        return "rgb(245,83,52)";
      case 128:
        return "rgb(234,200,103)";
      case 256:
        return "#edcc61";
      case 512:
        return "#9c0";
      case 1024:
        return "#3365a5";
      case 2048:
        return "#09c";
    }
  }
  //update font color
  function updateFontColor(figure) {
    switch (figure) {
      case 0:
        return "rgb(202,193,181)";
      case 2:
        return "rgb(117,110,102)";
      case 4:
        return "rgb(117,110,102)";
      default:
        return "rgb(248,246,242)";
    }
  }

  //update the outlook
  function updateHtmlCss() {
    for (i in positionList){
      for (j in positionList[i]){
        //update the backgroundColor and font color according to the figure
        document.getElementById('r'+i+'-c'+j).innerText=positionList[i][j];
        let backColor = updateBackgroundColor(positionList[i][j]);
        document.getElementById('r'+i+'-c'+j).style.backgroundColor=backColor;
        let fontColor = updateFontColor(positionList[i][j]);
        document.getElementById('r'+i+'-c'+j).style.color=fontColor;
      }
    }
  }

  //merge with keyInput left
  function checkNotZero(figure) {
    if (figure !== 0){
      return true;
    }else {return false;}
  }
  //return the index with the same value
  //check there is a equal in a row
  function getSamePositionLeft(row,column) {
    var temp = 0;
    while (column<4){
      if (checkNotZero(positionList[row][column])){
        if (positionList[row][column] === temp){
          return column;
        }else{column+=1;}
        temp = positionList[row][column-1];
      }else {column+=1;}
    }
    return false;
  }
  //check if there is a equal in as the given [row,column]
  function checkEqualRow(row,column) {
    if (checkNotZero(positionList[row][column])){
      var temp = positionList[row][column];
      column++;
      while (column < 4){
        if (positionList[row][column] === temp){
          return temp*2;
        }else {
          if (positionList[row][column] ===0){
            column++;
          }else{return false;}
        }
      }
      return false;
    }else {return false;}
  }
  //check if there is a equal in each column
  function checkEqualColumn(row,column) {
    if (checkNotZero(positionList[row][column])){
      var temp = positionList[row][column];
      row++;
      while (row < 4){
        if (positionList[row][column] === temp){
          return temp*2;
        }else {
          if (positionList[row][column] ===0){
            row++;
          }else{return false;}
        }
      }
      return false;
    }else {return false;}
  }

  //switch from left to right
  function switchRightToLeft(listLeft) {
    let tempList = new Array();
    for (var i=0; i < 4; i++){
      tempList[i] = new Array();
      for (var j = 0; j < 4; j++){
        tempList[i][j] = 0;
      }
    }
    for (var i=0;i<4;i++){
      var counter = 0;
      for (var j=0;j<4;j++){
        if (! checkNotZero(listLeft[i][j])){
          counter++;
        }
      }
      //update by index of not zero
      for (var j=0;j<4;j++){
        if (j+counter<4){
          tempList[i][j+counter]=listLeft[i][j];
        }
      }
    }
    return tempList;
  }

  //switch up To left after merge
  function switchUpToLeft(listleft) {
    let tempList = new Array();
    for (var i=0; i < 4; i++){
      tempList[i] = new Array();
      for (var j = 0; j < 4; j++){
        tempList[i][j] = 0;
      }
    }
    //transpose of the matrix
    for (var i=0;i<4;i++){
      for (var j=0;j<4;j++){
        tempList[j][i] = listleft[i][j];
      }
    }
    return tempList;
  }
  //switch down To left after merge
  function switchDownToLeft(listLeft) {
    let tempList = new Array();
    for (var i=0; i < 4; i++){
      tempList[i] = new Array();
      for (var j = 0; j < 4; j++){
        tempList[i][j] = 0;
      }
    }
    for (var j=0;j<4;j++){
      var counter = 0;
      for (var i=0;i<4;i++){
        if (! checkNotZero(listLeft[i][j])){
          counter++;
        }
      }
      //update by index of not zero
      for (var i=0;i<4;i++){
        if (i+counter<4){
          tempList[i+counter][j]=listLeft[i][j];
        }
      }
    }
    return tempList;
  }

  //merge by keyboard "left"
  function mergeLeft() {
    console.log(positionList[0]);
    console.log(positionList[1]);
    console.log(positionList[2]);
    console.log(positionList[3]);
    //build a temp list store new position
    let tempList = new Array();
    for (var i=0; i < 4; i++){
      tempList[i] = new Array();
      for (var j = 0; j < 4; j++){
        tempList[i][j] = 0;
      }
    }
    //update temp and merge to older one
    var removeFigure;
    for (var i = 0; i < 4; i++) {
      let index = 0;
      for (var j = 0; j < 4; j++) {
        if (checkEqualRow(i, j)) {
          tempList[i][index] = checkEqualRow(i, j);
          removeFigure = getSamePositionLeft(i, j);
          positionList[i][removeFigure] = 0;
          index++;
        } else {
          if (checkNotZero(positionList[i][j])) {
            tempList[i][index] = positionList[i][j];
            index++;
          }
        }
      }
    }
    positionList = tempList;
  }

  //merge by keyboard "right"
  function mergeRight() {
    console.log(positionList[0]);
    console.log(positionList[1]);
    console.log(positionList[2]);
    console.log(positionList[3]);
    //build a temp list store new position
    let tempList = new Array();
    for (var i=0; i < 4; i++){
      tempList[i] = new Array();
      for (var j = 0; j < 4; j++){
        tempList[i][j] = 0;
      }
    }
    //update temp and merge to older one
    var removeFigure;
    for (var i = 0; i < 4; i++) {
      let index = 0;
      for (var j = 0; j < 4; j++) {
        if (checkEqualRow(i, j)) {
          tempList[i][index] = checkEqualRow(i, j);
          removeFigure = getSamePositionLeft(i, j);
          positionList[i][removeFigure] = 0;
          index++;
        } else {
          if (checkNotZero(positionList[i][j])) {
            tempList[i][index] = positionList[i][j];
            index++;
          }
        }
      }
    }
    positionList = switchRightToLeft(tempList);
  }

  //merge by keyboard "up"
  function mergeUp() {
    console.log(positionList[0]);
    console.log(positionList[1]);
    console.log(positionList[2]);
    console.log(positionList[3]);
    //build a temp list store new position
    let tempList = new Array();
    for (var i=0; i < 4; i++){
      tempList[i] = new Array();
      for (var j = 0; j < 4; j++){
        tempList[i][j] = 0;
      }
    }
    //transpose the positionlist
    positionList = switchUpToLeft(positionList);
    //update temp and merge to older one
    var removeFigure;
    for (var i = 0; i < 4; i++) {
      let index = 0;
      for (var j = 0; j < 4; j++) {
        if (checkEqualRow(i, j)) {
          tempList[i][index] = checkEqualRow(i, j);
          removeFigure = getSamePositionLeft(i, j);
          positionList[i][removeFigure] = 0;
          index++;
        } else {
          if (checkNotZero(positionList[i][j])) {
            tempList[i][index] = positionList[i][j];
            index++;
          }
        }
      }
    }
    //transpose back
    positionList = switchUpToLeft(tempList);
  }
  //merge by keyboard "down"
  function mergeDown() {
    console.log(positionList[0]);
    console.log(positionList[1]);
    console.log(positionList[2]);
    console.log(positionList[3]);
    //build a temp list store new position
    let tempList = new Array();
    for (var i=0; i < 4; i++){
      tempList[i] = new Array();
      for (var j = 0; j < 4; j++){
        tempList[i][j] = 0;
      }
    }
    positionList = switchUpToLeft(positionList);
    //update temp and merge to older one
    var removeFigure;
    for (var i = 0; i < 4; i++) {
      let index = 0;
      for (var j = 0; j < 4; j++) {
        if (checkEqualRow(i, j)) {
          tempList[i][index] = checkEqualRow(i, j);
          removeFigure = getSamePositionLeft(i, j);
          positionList[i][removeFigure] = 0;
          index++;
        } else {
          if (checkNotZero(positionList[i][j])) {
            tempList[i][index] = positionList[i][j];
            index++;
          }
        }
      }
    }
    positionList = switchUpToLeft(tempList);
    positionList = switchDownToLeft(positionList);
  }
  
      //check if end the game
      function checkStatus() {
        checkWin();
        checkLose();
      }
      //if full return true
      function checkFull() {
        let counter = 0;
        for (var i=0;i<4;i++){
          for (var j=0;j<4;j++){
            if (checkNotZero(positionList[i][j])){
              counter++;
            }
          }
        }
        if (counter === 16){
          return true;
        }else {return false;}
      }
      //check each row exist merge
      function checkExistMergeRow() {
        let counter = 0;
        for (var i=0;i<4;i++){
          for (var j=0;j<4;j++) {
            if (checkEqualRow(i, j)) {
              counter += 1;
            }
          }
        }
        console.log(counter);
        if (counter ===0){
          return false;
        }else {return true}
      }
      //check each column exist merge
      function checkExistMergeColumn() {
        let counter = 0;
        for (var i=0;i<4;i++){
          for (var j=0;j<4;j++) {
            if (checkEqualColumn(i, j)) {
              counter += 1;
              break;
            }
          }
        }
        if (counter ===0){
          return false;
        }else {return true}
      }
      //check after merge, win or lose or keep going?
      function checkWin() {
        for (var i=0;i<4;i++){
          for (var j=0;j<4;j++){
            if (positionList[i][j] === 2048){
              alert("Congratulations! YOU WIN !");
              break;
            }
          }
        }

      }
      function checkLose() {
        if (checkFull() && ! checkExistMergeColumn()){
          alert("Sorry YOU LOSE, Please Try Again :(");
        }
      }
    
  return (
      <div className="container">
        <div className="figure-box" id="r0-c0">2</div>
        <div className="figure-box" id="r0-c1"></div>
        <div className="figure-box" id="r0-c2"></div>
        <div className="figure-box" id="r0-c3"></div>
        <div className="figure-box" id="r1-c0"></div>
        <div className="figure-box" id="r1-c1"></div>
        <div className="figure-box" id="r1-c2"></div>
        <div className="figure-box" id="r1-c3"></div>
        <div className="figure-box" id="r2-c0"></div>
        <div className="figure-box" id="r2-c1"></div>
        <div className="figure-box" id="r2-c2"></div>
        <div className="figure-box" id="r2-c3"></div>
        <div className="figure-box" id="r3-c0"></div>
        <div className="figure-box" id="r3-c1"></div>
        <div className="figure-box" id="r3-c2"></div>
        <div className="figure-box" id="r3-c3"></div>
      </div>
  );
}

export default App;
