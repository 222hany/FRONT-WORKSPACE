//아이디에 5~20 영소문자, 숫자 포함되지 않은 경우
function submitAccountId(){
    var accountId = document.getElementById("accountId").value;
    var confirmAccountId = document.getElementById("confirmAccountId").value;
    var accountIdPattern = /^(?=.*[a-z])(?=.*\d)[a-z\d]{5,20}$/
    var errorAccountId = document.getElementById("pm");

    if(!accountId.match(accountIdPattern)){
        errorAccountId.textContent = "아이디는 5 ~ 20자의 영문 소문자, 숫자를 포함해야 합니다.";
        return false;
    }else{
        errorAccountId.textContent = "";
    }
}

//아이디가 중복될 경우

//비밀번호에 8~32 영대/소문자, 숫자, 특수문자 포함되지 않은 경우
function submitPassword(){
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
    var errorPassword = document.getElementById("pm");

    if(!password.match(passwordPattern)){
        errorPassword.textContent = "비밀번호는 8 ~ 32자의 영문 대문자, 소문자, 특수문자, 숫자를 포함해야합니다.";
        return false;
    }else{
        errorPassword.textContent = "";
    }
    
    //비밀번호가 일치하지 않을 경우
    if(password !== confirmPassword){
        errorPassword.textContent = "비밀번호가 일치하지 않습니다.";
        return false;
    }else{
        errorPassword.textContent = "";
    }
}
