//change my profile
function changeMyProfile() {
    document.getElementById("changeProfileForm").style.display = "block";
    document.getElementById("main-feed").style.display = "none";
    document.getElementById("user-detail").style.display = "none";
}
function cancelChangeProfile(){
    document.getElementById("changeProfileForm").style.display = "none";
    document.getElementById("main-feed").style.display = "block";
}
function checkNameChange(formName){
    var nameValue = formName.usernameChange.value;
    let node = document.getElementById("nameHintChange");
    if (nameValue === "") {
        node.innerText = "User_name should not be empty";
    }else {
        node.innerText = "";
    }
}

function checkPassChange(formName) {
    var passValue = formName.passwordChange.value;
    let node = document.getElementById("passHintChange");
    if (passValue === "") {
        node.innerText = "password should not be empty";
    }else {
        node.innerText = "";
    }
}
function checkConfirmChange(){
    let passValue = changeProfile.passwordChange.value;
    let doublecheck = changeProfile.confirmPasswordChange.value;
    let node = document.getElementById("confirmPassChange")
    if (passValue === doublecheck){
        node.innerText = "";
        return true;
    }else {
        node.innerText = "Please check double password input :("
        return false;
    }
}
function submitChangeButton(){
    let name = changeProfile.usernameChange.value;
    let password = changeProfile.passwordChange.value;
    let email = changeProfile.emailChange.value;
    data = {"email":email,"name":name,"password":password};
    var para = {
        method:'PUT',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Token ${token}`
        },
    }
    if (checkConfirmChange()){
        document.getElementById("loginJs").src = "src/login.js";
        fetch(`http://127.0.0.1:${portNumber}/user/`,para).then(res=>{
            if (res.status === 200){
                res.json().then(res=>{
                    console.log("success");
                    document.getElementById("changeProfileForm").style.display = "none";
                    document.getElementById("main-feed").style.display = "block";
                    popError(res[msg]);
                });
            }else {
                res.json().then(res=>{
                    console.log(res["message"]);
                    popError(res["message"]);
                })
            }
        });
    }else {
        popError("Incorrect Input!");
    }
}

//show post in user profile page
function showdetailsInProfile(res){
    let idFeed = res.id;
    let authorFeed = res.meta.author;
    let descriptionFeed = res.meta.description_text;
    let publishedFeed = res.meta.string;
    let likesFeed = res.meta.likes;
    let thumbnailFeed = res.thumbnail;
    let srcFeed = res.src;
    let commentFeed = res.comments;
    // console.log('id', idFeed);
    // console.log('author', authorFeed);
    // console.log('description', descriptionFeed);
    // console.log('published', publishedFeed);
    // console.log('likesFeed', likesFeed);
    // console.log('comments', commentFeed);
    // console.log('thumbnail',thumbnailFeed);
    // console.log('src',srcFeed);
    figureCardNode = document.createElement("div");
    figureCardNode.setAttribute("class", "figureCard");
    document.getElementById("all-figure-card").appendChild(figureCardNode);
    //create node save id content
    idNode = document.createElement("div");
    idNode.setAttribute("id",`${idFeed}`);
    figureCardNode.appendChild(idNode);
    //top part(contain thumbnail and author)
    topNode = document.createElement("div");
    topNode.setAttribute("class", "topPart");
    topNode.setAttribute("class",`${authorFeed}`);
    figureCardNode.appendChild(topNode);
    //show detail of thumbnail
    thumbnode = document.createElement("img");
    thumbnode.setAttribute("class", "thumbPic");
    thumbnode.src = `data:image/png;base64, ${thumbnailFeed}`;
    thumbnode.setAttribute("onclick","showUserDetail(this)");
    topNode.appendChild(thumbnode);
    //author part
    authorNode = document.createElement("span");
    authorNode.setAttribute("class", "author");
    authorNode.setAttribute("onclick","showUserDetail(this)");
    authorNode.innerText = authorFeed;
    topNode.appendChild(authorNode);
    brNode = document.createElement("br");
    topNode.appendChild(brNode);
    //show detail of pic
    imgDivNode = document.createElement("div")
    imgNode = document.createElement("img");
    imgNode.setAttribute("class", "srcPic");
    imgNode.src = `data:image/png;base64, ${srcFeed}`;
    imgDivNode.appendChild(imgNode)
    figureCardNode.appendChild(imgDivNode);
    //description part
    descriptionNode = document.createElement("h3");
    descriptionNode.setAttribute("class", "descriptionText")
    descriptionNode.innerText = descriptionFeed;
    figureCardNode.appendChild(descriptionNode);
    //likes part
    likeNode = document.createElement("div");
    likeNode.setAttribute("class", "likePart");
    likeTextNode = document.createElement("div");
    likeTextNode.setAttribute("class","likeText");
    // likesFeed = transName2IdList(likesFeed);
    likeTextNode.innerText = `users like: ${likesFeed.length}`;
    likeNode.appendChild(likeTextNode)
    figureCardNode.appendChild(likeNode);
    //like button
    likebutton = document.createElement("input");
    likeNode.appendChild(likebutton);
    likebutton.setAttribute("type", "button");
    likebutton.setAttribute("name", "like");
    likebutton.setAttribute("value", "like");
    likebutton.setAttribute("onclick", 'sendLike(this)');
    likebutton.setAttribute("class", "likeButton btn btn-info");
    //dislike button
    dislikebutton = document.createElement("input");
    likeNode.appendChild(dislikebutton);
    dislikebutton.setAttribute("type", "button");
    dislikebutton.setAttribute("name", "dislike");
    dislikebutton.setAttribute("value", "dislike");
    dislikebutton.setAttribute("onclick",'sendDislike(this)')
    dislikebutton.setAttribute("class", "likeButton btn btn-info");
    //comment part
    commentNode = document.createElement("div");
    commentNode.setAttribute("class", "commentPart")
    for (var i = 0; i < commentFeed.length; i++) {
        commentAuthor = commentFeed[i].author;
        commetPublished = commentFeed[i].published;
        commentComment = commentFeed[i].comment;
        eachPersonCommentNode = document.createElement("div");
        commentNode.appendChild(eachPersonCommentNode)
        commetPublished = translateTime(commetPublished);
        //add each comment with their author, published, comment;
        let authorNode = document.createElement("span");
        authorNode.innerText = `${commentAuthor}: `;
        eachPersonCommentNode.appendChild(authorNode);
        let tempCommentNode = document.createElement("h4");
        tempCommentNode.innerText = `${commentComment}`;
        eachPersonCommentNode.appendChild(tempCommentNode);
        let publishedNode = document.createElement("span");
        publishedNode.innerText = `Reply at: ${commetPublished}`;
        eachPersonCommentNode.appendChild(publishedNode);

    }
    figureCardNode.appendChild(commentNode);
    //send comment
    newComment = document.createElement("div");
    figureCardNode.appendChild(newComment);
    newComment.setAttribute("class","newComment");
    commentSendNode = document.createElement("textarea");
    commentSendNode.setAttribute("class","commentSend");
    newComment.appendChild(commentSendNode);
    //send comment button
    commentSendButton = document.createElement("input");
    newComment.appendChild(commentSendButton);
    commentSendButton.setAttribute("type", "button");
    commentSendButton.setAttribute("name", "commentSendButton");
    commentSendButton.setAttribute("value", "send");
    commentSendButton.setAttribute("onclick",'sendDComment(this)')
    commentSendButton.setAttribute("class", "commentSendButton btn btn-info pro-button");
    // likesFeed = await transName2IdList(likesFeed);
    // likeTextNode.innerText = likesFeed;
    //set unfollow button
    unfollowButton = document.createElement("input");
    figureCardNode.appendChild(unfollowButton);
    unfollowButton.setAttribute("type", "button");
    unfollowButton.setAttribute("name", "unfollow");
    unfollowButton.setAttribute("value", "unfollow");
    unfollowButton.setAttribute("onclick", 'unfollowUser(this)');
    unfollowButton.setAttribute("class", "unfollowButton btn btn-info pro-button");
    //delete button
    deleteMyPostButton = document.createElement("input");
    figureCardNode.appendChild(deleteMyPostButton);
    deleteMyPostButton.setAttribute("type", "button");
    deleteMyPostButton.setAttribute("name", "delete");
    deleteMyPostButton.setAttribute("value", "DELETE");
    deleteMyPostButton.setAttribute("onclick", 'deleteMyPost(this)');
    deleteMyPostButton.setAttribute("class", "deletePost btn btn-info pro-button");
    //change post button
    editMyPostButton = document.createElement("input");
    figureCardNode.appendChild(editMyPostButton);
    editMyPostButton.setAttribute("type", "button");
    editMyPostButton.setAttribute("name", "edit");
    editMyPostButton.setAttribute("value", "EDIT");
    editMyPostButton.setAttribute("onclick", 'editMyPost()');
    editMyPostButton.setAttribute("class", "editPost btn btn-info pro-button");
}