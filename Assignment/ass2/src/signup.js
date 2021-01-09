function checkNameSign(formName){
    let nameValue = formName.usernameSign.value;
    let node = document.getElementById("nameHintSign");
    if (nameValue === "") {
        node.innerText = "User_name should not be empty";
        return false;
    }else {
        node.innerText = "";
        return true;
    }
}
function checkNickName(formName){
    let nameValue = formName.usernameSign.value;
    let node = document.getElementById("necknameSign");
    if (nameValue === "") {
        node.innerText = "Name should not be empty";
        return false;
    }else {
        node.innerText = "";
        return true;
    }
}
function checkPassSign(formName) {
    let passValue = formName.passwordSign.value;
    let node = document.getElementById("passHintSign");
    if (passValue === "") {
        node.innerText = "password should not be empty";
        return false;
    }else {
        node.innerText = "";
        return true;
    }
}
function checkConfirm(){
    let passValue = signUp.passwordSign.value;
    let doublecheck = signUp.confirmPassword.value;
    let node = document.getElementById("confirmPass")
    if (passValue === doublecheck){
        node.innerText = "";
        return true;
    }else {
        node.innerText = "Please check double password input :("
        return false;
    }
}
function submitSignButton(){
    let name = signUp.usernameSign.value;
    let password = signUp.passwordSign.value;
    let email = signUp.emailSign.value;
    let nickname = signUp.nameSign.value;
    data = {"username":name,"password":password,"email":email,"name":nickname}
    let para = {
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        },
    }
    if (checkConfirm()){
        fetch(`http://127.0.0.1:${portNumber}/auth/signup`,para).then(res=>{
            if (res.status === 200){
                res.json().then(res=>{
                    console.log("success");
                    token = res[token];
                    console.log(token);
                    alert(token);
                    document.getElementById("signForm").style.display = "none";
                    document.getElementById("loginForm").style.display = "block";
                });
            }else {
                res.json().then(res=>{
                    console.log(res["message"]);
                    alert(res["message"]);
                })
            }
        });
    }else {
        alert("Incorrect Input!");
    }
}
//button cancel in signup
function cancelSignUp() {
    document.getElementById("signForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}


