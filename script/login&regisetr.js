$(document).ready(function(){
    $("#loginBtn").click(function(){
        resetForm();
        $(".registerHint").addClass("hide");
        $("#registerForm").addClass("hide");
        $("#loginForm").removeClass("hide");
        $("#loginForm").addClass("block-flex");
    });
    $("#registerBtn").click(function(){
        resetForm();
        $(".registerHint").addClass("hide");
        $("#loginForm").addClass("hide");
        $("#registerForm").removeClass("hide");
        $("#registerForm").addClass("block-flex");
    });
    $("#registerSubmit").click(register);
    $("#loginSubmit").click(login);
    $("#logoutBtn").click(logout);
    $(".form-close").click(closeForm);

});

function closeForm(){
    $("#registerForm").addClass("hide");
    $("#loginForm").addClass("hide");
    $("#loginForm").removeClass("block-flex");
    $("#registerForm").removeClass("block-flex");

}

function resetForm(){
    $("form").each(function(){
        $(this)[0].reset();
    });
}

function register(){
    var userName = $("#registerUserName").val();
    var email = $("#registerEmail").val();
    var password = $("#registerPassword").val();
    if(userName!=""&&email!=""&&password.length>=6){
        var password_hash = SHA256(password);
        $.ajax({
            type: "POST",
            url: "./external/register.php",
            dataType: "text",
            data: {"user_name": userName, "user_password_hash": password_hash, "user_email": email},
            success: function (data) {
                if(data==10){
                    $(".registerHint").html("Username or email exists").removeClass("hide");
                }
                else if(data==12){
                    $(".registerHint").html("Server Error").removeClass("hide");
                }
                else if(data==11){
                    $(".registerHint").html("Success").removeClass("hide");
                    setTimeout(function(){
                        location.href = "./";
                    }, 500);
                }
            },
            error: function () {
                console.log("error");
            }
        })
    }
    else{
        $(".registerHint").removeClass("hide").html("!!!Empty input or password less than 6 characters.");
    }
}

function login(){
    var userName = $("#loginUserName").val();
    var password = $("#loginPassword").val();
    var password_hash = SHA256(password);
    $.ajax({
        type: "POST",
        url: "./external/login.php",
        dataType: "text",
        data: {"user_name": userName, "user_password_hash": password_hash},
        success: function (data) {
            if(data=="You have already login"){
                $(".loginHint").html(data).removeClass("hide");
            }
            else if(data=="null"){
                $(".loginHint").html("Username or password error").removeClass("hide");
            }
            else{
                $(".loginHint").html("Welcome, "+data).removeClass("hide");
                setTimeout(function(){
                    closeForm();
                    $("#userBtn").attr("username", data);
                    afterLogin();
                }, 1000);
            }
        },
        error: function () {
            console.log("error");
        }
    })
}

function afterLogin(){
    $("#welcomeHint").html("&nbsp Welcome, "+$("#userBtn").attr("username"));
    $("#registerBtn").addClass("hide");
    $("#loginBtn").addClass("hide");
    $("#userBtn").removeClass("hide");
    $("#logoutBtn").removeClass("hide");
    loadTodoList();
}

function logout(){
    $.ajax({
        type: "POST",
        url: "./external/logout.php",
        dataType: "text",
        success: function (data) {
            setTimeout(afterLogout, 300);
        },
        error: function () {
            console.log("error");
        }
    })
}

function afterLogout(){
    $("#userBtn").attr("username", "");
    $("#welcomeHint").html("");
    $("#registerBtn").removeClass("hide");
    $("#loginBtn").removeClass("hide");
    $("#userBtn").addClass("hide");
    $("#logoutBtn").addClass("hide");
    location.href = "./";
}
