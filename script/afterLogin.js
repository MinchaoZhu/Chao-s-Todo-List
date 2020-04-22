$(document).ready(function(){
    checkSession();
});



function checkSession(){
    $.ajax({
        type: "POST",
        url: "./external/sessionCheck.php",
        dataType: "text",
        success: function (data) {
            if(data!="null"){
                $("#userBtn").attr("username", data);
                afterLogin();
            }
        },
        error: function () {
            console.log("error");
        }
    })
}
