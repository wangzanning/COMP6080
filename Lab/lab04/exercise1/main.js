//add event listener from keyboard input
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