//cancel button in user detail
function cancelCheckDetail() {
    document.getElementById("main-feed").style.display = "block";
    document.getElementById("user-detail").style.display = "none";
    deleteNode = document.getElementById("user-post").children[0];
    document.getElementById("user-post").removeChild(deleteNode);
    document.getElementById("changeProfileButton").style.display = "none";
}
//show the user post in user detail
function showPost(res){
    let nameDetail = res.username;
    let nickNameDetail = res.name;
    let idDetail = res.id;
    let emailDetail = res.email;
    let followingDetail = res.following.length;
    let followedNum = res.followed_num;
    let havePostDetail = res.posts;
    console.log(havePostDetail);
    let lengthPosts = res.posts.length;
    // console.log(idDetail);
    document.getElementById("user-name").innerText = `Name: ${nameDetail}`;
    document.getElementById("user-neckName").innerText = `NickName: ${nickNameDetail}`;
    document.getElementById("user-id").innerText = `ID: ${idDetail}`;
    document.getElementById("user-email").innerText = `Email: ${emailDetail}`;
    document.getElementById("user-following").innerText = `User Following: ${followingDetail}`;
    document.getElementById("user-followed-number").innerText = `Followed Number: ${followedNum}`;
    postNode = document.getElementById("user-post");
    document.getElementById("loginJs").src = "src/login.js";
    allFigureNode = document.createElement("div");
    allFigureNode.setAttribute("id","all-figure-card");
    document.getElementById("user-post").appendChild(allFigureNode);
    for(let i=0; i<lengthPosts; i++){

        let currentPost = havePostDetail[i]
        let para = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        }
        fetch(`http://127.0.0.1:${portNumber}/post/?id=${currentPost}`,para).then(res=>{
            if (res.status === 200){
                res.json().then(res=>{
                    // console.log(res);
                    showdetailsInProfile(res)
                })
            }
        })
    }
}
//translate user id to name list
function transName2IdList(input){
    return new Promise((resolve => {

        let nameList = ['bug'];
        for (let id of input){
            document.getElementById("loginJs").src = "src/login.js";
            let para = {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            }
            fetch(`http://127.0.0.1:${portNumber}/user/?id=${id}`,para).then(res=>{
                if (res.status === 200){
                    res.json().then(res=>{
                        output = res.username;
                        // console.log(`123321${output}`);
                        nameList.push(`${output}`);
                        resolve(nameList);
                        // console.log(`123321123321${nameList}`);
                    })
                }
            })
        }
    }))
}

//show user detail when click on name or photo
function showUserDetail(ele){
    //set the detail block appear
    document.getElementById("loginJs").src = "src/login.js";
    document.getElementById("user-detail").style.display = "block"
    document.getElementById("main-feed").style.display = "none";
    let userName = ele.parentNode.getAttribute("class");
    let para = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    }
    fetch(`http://127.0.0.1:${portNumber}/user/?username=${userName}`,para).then(res=>{
        if (res.status === 200){
            res.json().then(res=>{
                console.log(res);
                showPost(res);
            })
        }else {
            res.json().then(res => {
                alert(res);
            })
        }
    })
}
//show my profile
function showMyProfile(){
    document.getElementById("changeProfileButton").style.display = "block";
    document.getElementById("loginJs").src = "src/login.js";
    document.getElementById("user-detail").style.display = "block"
    document.getElementById("main-feed").style.display = "none";
    let name = loginName;
    let para = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    }
    fetch(`http://127.0.0.1:${portNumber}/user/?username=${name}`,para).then(res=>{
        if (res.status === 200){
            res.json().then(res=>{
                console.log(res);
                showPost(res);
            })
        }else {
            res.json().then(res => {
                alert(res);
            })
        }
    })
}