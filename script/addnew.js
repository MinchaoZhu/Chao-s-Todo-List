$(document).ready(function(){
    $(".addNewRegularTaskBtn").click(function(){
        resetForm();
        $("#regularTaskForm").removeClass("hide");
        $("#regularTaskForm").addClass("block-flex");
    });
    $(".addNewDeadline").click(function(){
        resetForm();
        $("#deadlineForm").removeClass("hide");
        $("#deadlineForm").addClass("block-flex");
    });
    $("#addRegularTask").click(addNewRegular);

});

function addNewRegular(){
    var username = $("#userBtn").attr("username");
    var start_date = $("#startDate").val();
    var end_date = $("#endDate").val();
    var detail = $("#regularDetail").val();
    var start = new Date(start_date);
    var end = new Date(end_date);
    start_date =start.getFullYear()+"-"+((start.getMonth()+1)<10 ? '0' : '') + (start.getMonth()+1) + '-' +
    (start.getDate()<10 ? '0' : '') + start.getDate();
    end_date =end.getFullYear()+"-"+(end.getMonth()+1<10 ? '0' : '') + (end.getMonth()+1) + '-' +
    (end.getDate()<10 ? '0' : '') + end.getDate();
    if(detail!=""&&parseInt(start.getTime())<=parseInt(end.getTime())){
        $.ajax({
            type: "POST",
            url: "./external/newRegular.php",
            dataType: "text",
            data: {
                "user_name": username,
                "todo": detail,
                "start_date": start_date,
                "end_date": end_date
            },
            success: function (data) {
                console.log(data);
                $(".regularHint").html("Add new regular task successfully").removeClass("hide");
                setTimeout(function(){
                    $(".regularHint").addClass("hide").html();        
                    resetForm();
                    $("#regularTaskForm").addClass("hide");
                    $("#regularTaskForm").removeClass("block-flex");  
                    $(".todo-list").empty();
                    loadTodoList();
                },  500);
            },
            error: function () {
                console.log("error");
            }
        })
    }
    else{
        $(".regularHint").html("Empty detail or end date earlier than start date").removeClass("hide");
    }


}

