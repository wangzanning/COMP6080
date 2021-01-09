window.token = "";
window.loginName = "";
//change port number here:
window.portNumber = 5000;

function checkName(formName){
    let nameValue = formName.username.value;
    let node = document.getElementById("nameHint");
    if (nameValue === "") {
        node.innerText = "User_name should not be empty";
        return false
    }else {
        node.innerText = "";
        return true
    }
}
function checkPass(formName) {
    let passValue = formName.password.value;
    let node = document.getElementById("passHint");
    if (passValue === "") {
        node.innerText = "password should not be empty";
        return false
    }else {
        node.innerText = "";
        return true
    }
}

function showignUpButton(){
    document.getElementById("signForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
}


function submitLoginButton() {
    let name = loginIn.username.value;
    let password = loginIn.password.value;
    // remove comment after test
    if (! checkName(loginIn) ||! checkPass(loginIn)){
        alert("Username or keyword should not be empty")
        return false
    }
    loginName = name;
    data = {"username":name, "password": password};
    console.log(data);
    let para = {
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        },
    }
    fetch(`http://127.0.0.1:${portNumber}/auth/login`,para).then(res=> {
        console.log(res);
        if (res.status === 200){
            res.json().then(res=>{
                token = res["token"];
                console.log(token);
                document.getElementById("loginForm").style.display = "none";
                document.getElementById("main-feed").style.display = "block";
            }).then(showFeed);

        }else {
            res.json().then(res=>{
                console.log(res["message"]);
                alert(res["message"]);
            })
        }
    });
}


