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