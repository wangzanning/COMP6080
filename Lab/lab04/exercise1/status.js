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