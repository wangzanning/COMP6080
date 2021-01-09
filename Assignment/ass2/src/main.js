// z5224151	ZANNING WANG
// 2020.10.11	Sunday
// Assignment02
//add infinite scroll
//Attention!!! change port number in login.js
var pageLoading = false;
var pageEnd = false;
var triggerDistance = 250;
window.addEventListener('scroll',scrollShowContent);
function scrollShowContent(){
    let contentBox = document.getElementById("main-feed");
    let distance = contentBox.getBoundingClientRect().bottom - window.innerHeight;
    //check the distance between bottom of the main-feed and the bottom of the window
    if (! pageLoading && !pageEnd && distance < triggerDistance) {
        pageLoading = true;
        document.getElementById("loginJs").src = "src/login.js";
        let para = {
            method: 'GET',
            // body:JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        }
        //p :post to start at
        //n :Number of posts to fetch
        let p = 5;
        let n = 5;
        fetch(`http://127.0.0.1:${portNumber}/user/feed?p=${p}&n=${n}`, para).then(res => {
            if (res.status === 200) {
                res.json().then(res => {
                    for (let i=0; i<n; i++){
                        console.log(res);
                        showdetails(res,i);
                    }
                    p+=5;
                    pageLoading = false;

                })
            } else {
                res.json().then(res => {
                    console.log(res["message"]);
                    // alert("No More Content");
                })
            }
        });
    }
}
// pop error or success message
function popError(message){
    let divNode = document.createElement("div");
    let aNode = document.createElement("a");
    divNode.appendChild(aNode);
    divNode.style.display = "float";

    document.getElementsByTagName("header")[0].appendChild(divNode);
    divNode.setAttribute("class", "alert alert-warning pop");
    divNode.setAttribute("id","errorMessage");
    divNode.innerText = `Error: ${message}`;
    bNode = document.createElement("a");
    divNode.appendChild(bNode);
    bNode.setAttribute("href", "#");
    bNode.setAttribute("class","close");
    bNode.setAttribute("data-dismiss","alert");
    bNode.innerHTML = "&times;";
}
// pop error or success message
function popSuccess(message){
    let divNode = document.createElement("div");
    let aNode = document.createElement("a");
    divNode.appendChild(aNode);
    document.getElementsByTagName("header")[0].appendChild(divNode);
    divNode.setAttribute("class", "alert alert-success pop");
    divNode.setAttribute("id","errorMessage");
    divNode.innerText = `${message}`;
    bNode = document.createElement("a");
    divNode.appendChild(bNode);
    bNode.setAttribute("href", "#");
    bNode.setAttribute("class","close");
    bNode.setAttribute("data-dismiss","alert");
    bNode.innerHTML = "&times;";
}