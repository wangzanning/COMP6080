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