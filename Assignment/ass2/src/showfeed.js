function showFeed() {
    document.getElementById("loginJs").src = "src/login.js";
    console.log(token);
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
    let p = 0;
    let n = 5;
    fetch(`http://127.0.0.1:${portNumber}/user/feed?p=${p}&n=${n}`, para).then(res => {
        if (res.status === 200) {
            res.json().then(res => {
                for (i=0;i<n;i++){
                    showdetails(res,i);
                }
            })
        } else {
            res.json().then(res => {
                console.log(res["message"]);
                alert(res["message"]);
            })
        }
    });
}

//translate the time into the right output
//this function's idea come from the website, make a little change to suit my program
function translateTime(input) {
    let time = new Date(input * 1000);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.toTimeString().substr(0, 8);
    let output = `${year}/${month}/${day}/${hour}`;
    return output;
}

function showdetails(res,item) {
    res = res.posts[item];
    let idFeed = res.id;
    let authorFeed = res.meta.author;
    let descriptionFeed = res.meta.description_text;
    let publishedFeed = res.meta.string;
    let likesFeed = res.meta.likes;
    let thumbnailFeed = res.thumbnail;
    let srcFeed = res.src;
    let commentFeed = res.comments;
    console.log('id', idFeed);
    console.log('author', authorFeed);
    console.log('description', descriptionFeed);
    console.log('published', publishedFeed);
    console.log('likesFeed', likesFeed);
    console.log('comments', commentFeed);
    // console.log('thumbnail',thumbnailFeed);
    // console.log('src',srcFeed);
    figureCardNode = document.createElement("div");
    figureCardNode.setAttribute("class", "figureCard");
    document.getElementById("main-feed").appendChild(figureCardNode);
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
    likeTextNode.setAttribute("class","like-text");
    // likesFeed = transName2IdList(likesFeed);
    likeTextNode.innerText = `users like: ${likesFeed.length}`;
    likeNode.appendChild(likeTextNode)
    figureCardNode.appendChild(likeNode);
    brNode = document.createElement("br");
    likeNode.appendChild(brNode);
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
    for (let i = 0; i < commentFeed.length; i++) {
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
        let tempCommentNode = document.createElement("span");
        tempCommentNode.innerText = `${commentComment}`;
        eachPersonCommentNode.appendChild(tempCommentNode);
        let publishedNode = document.createElement("h4");
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
    commentSendNode.setAttribute("cols","40");
    commentSendNode.setAttribute("rows","5v");
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
    unfollowButton.setAttribute("value", "Unfollow this User");
    unfollowButton.setAttribute("onclick", 'unfollowUser(this)');
    unfollowButton.setAttribute("class", "unfollowButton btn btn-info pro-button");
}

