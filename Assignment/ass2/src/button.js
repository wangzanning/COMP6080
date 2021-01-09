//send like when click on like button
function sendLike(ele){
    document.getElementById("loginJs").src = "src/login.js";
    let likeId = ele.parentNode.parentNode.children[0]["id"];
    console.log(likeId);
    let para = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    }
    fetch(`http://127.0.0.1:${portNumber}/post/like?id=${likeId}`,para).then(res=>{
        if (res.status === 200) {
            res.json().then(res=>alert(res.message));
        }else {
            res.json().then(res=>{
                console.log(Error(res.message));
                alert(res.message);
            });
        }
    })
}
//send unlike when click on unlike button
function sendDislike(ele){
    document.getElementById("loginJs").src = "src/login.js";
    let likeId = ele.parentNode.parentNode.children[0]["id"];
    console.log(likeId);
    let para = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    }
    fetch(`http://127.0.0.1:5000/post/unlike?id=${likeId}`,para).then(res=>{
        if (res.status === 200) {
            res.json().then(res=>alert(res.message));
        }else {
            res.json().then(res=>{
                console.log(Error(res.message));
                alert(res.message);
            });
        }
    })
}
//send comment when click on sendComment button
function sendDComment(ele){
    document.getElementById("loginJs").src = "src/login.js";
    let content = ele.parentNode.children[0].value;
    let likeId = ele.parentNode.parentNode.children[0]["id"];
    data = {"comment":content}
    let para = {
        method: 'PUT',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            'Content-Type':'application/json',
        },
    }
    fetch(`http://127.0.0.1:${portNumber}/post/comment?id=${likeId}`,para).then(res=>{
        if (res.status === 200) {
            res.json().then(res=>alert(res.message));
        }else {
            res.json().then(res=>{
                console.log(Error(res.message));
                alert(res.message);
            });
        }
    })
}
//follow new user
function followNewUser() {
    let followContent = document.getElementById("new-follow");
    if (followContent.style.display === 'none') {
        followContent.style.display = "block";
    }else {
        followContent.style.display = "none";
    }

}
//follow new user
function followUserButton(){
    let followContent = document.getElementById("new-follow");
    document.getElementById("loginJs").src = "src/login.js";
    let followValue  = document.getElementById("follow-text").value;
    let para = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    }
    fetch(`http://127.0.0.1:${portNumber}/user/follow?username=${followValue}`,para).then(res=>{
        if (res.status === 200) {
            res.json().then(res=>{
                console.log(Error(res.message));
                alert(res.message);
                followContent.style.display = "none";
                document.getElementById("follow-text").value = "";
            });
        }else {
            res.json().then(res=>{
                console.log(Error(res.message));
                alert(res.message);
            });
        }
    })
}
//unfollow old user
function unfollowUser(ele){
    document.getElementById("loginJs").src = "src/login.js";
    let nameValue = ele.parentNode.children[1].children[1].innerHTML;
    console.log(nameValue);
    let para = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    }
    fetch(`http://127.0.0.1:${portNumber}/user/unfollow?username=${nameValue}`,para).then(res=>{
        if (res.status === 200) {
            res.json().then(res=>{
                console.log(res.message);
                alert(res.message);
                // followContent.style.display = "none";
            });
        }else {
            res.json().then(res=>{
                console.log(Error(res.message));
                alert(res.message);
            });
        }
    })
}

//read files
function readFiles(file){
    if (! file){
        return
    }
    let fileRead = new FileReader();
    return new Promise((resolve)=>{
        fileRead.addEventListener('load', res=>{
            let result = res.target.result;
            result = result.replace(/^data.*,/,"");
            resolve(result);
            // console.log(result);

        });
        fileRead.readAsDataURL(file);
    })
}
//send user new post
function sendNewPost(){
    document.getElementById("loginJs").src = "src/login.js";
    let file = document.getElementById("filePost").files[0];
    let commentUpLoad = document.getElementById("new-post-text").value;
    if (commentUpLoad === ''){
        // alert("Write something, Bro!");
        alert("Write something, Bro!");
        return;
    }
    readFiles(file).then(res=>{
        commentUpLoad = document.getElementById("new-post-text").value;
        data = {"description_text":commentUpLoad,"src":res};
        let para = {
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Token ${token}`,
            },
        }
        fetch('http://127.0.0.1:${portNumber}/post/',para).then(res=> {
            console.log(res);
            if (res.status === 200){
                res.json().then(res=>{
                    let postID = res["post_id"];
                    console.log(token);
                    alert(`New Post ID: ${postID}`);
                    document.getElementById("new-post").style.display = "none";
                    document.getElementById("main-feed").style.display = "block";
                })

            }else {
                res.json().then(res=>{
                    console.log(res["message"]);
                    alert(res["message"]);
                })
            }
        });
    });
}
//cancel the post return to the main feed
function cancelNewPost(){
    document.getElementById("main-feed").style.display = "block";
    document.getElementById("new-post").style.display = "none";

}

//make new post here
function makeNewPost(){
    document.getElementById("main-feed").style.display = "none";
    document.getElementById("new-post").style.display = "block";
}

//delete my post
function deleteMyPost(ele){
    document.getElementById("loginJs").src = "src/login.js";
    let deleteID = ele.parentNode.children[0]["id"];
    let para = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    }
    fetch(`http://127.0.0.1:${portNumber}/post/?id=${deleteID}`,para).then(res=>{
        if (res.status === 200) {
            res.json().then(res=>{
                console.log(res.message);
                alert(`Succeed, Post ID: ${res.message}`);
            });
        }else {
            res.json().then(res=>{
                console.log(Error(res.message));
                alert(res.message);
            });
        }
    })
}

//edit my post
function editMyPost(){
    document.getElementById("user-post").style.display = "none";
    document.getElementById("new-post").style.display = "block";
}