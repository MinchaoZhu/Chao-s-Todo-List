$(document).ready(function(){
    $("#ddl-undone").on('change', '.checkbox', function () {
        $($(this).closest(".ddlItem")).attr("status","2");
    });

    $("#ddl-done").on('change', '.checkbox', function () {
        $($(this).closest(".ddlItem")).attr("status","1");
    });

    $("#ddl-undone").on('click', '.remove', function () {
        $(this).parent().remove();
    });

    $("#ddl-done").on('click', '.remove', function () {
        $(this).parent().remove();
    });

    $(".ddl-sync").on("click", function () {
        setInterval(function(){
            syncDdl();
        }, 50);
    });

    $("#addDeadline").click(addDeadLine);

});



function syncDdl(){
    var username = $("#userBtn").attr("username");
    var ddlItems = [];
    $(".ddlItem").each(function (index, item) {
        var detail = $(item).attr("content");
        var date = $(item).attr("date");
        var status = $(item).attr("status");
        ddlItems.push({
            "detail": detail,
            "status": status,
            "due_date": date
        });
    });

    if(ddlItems==""){
        ddlItems="null";
    }
    $.ajax({
        type: "POST",
        url: "./external/syncDeadline.php",
        dataType: "text",
        data: {
            "user_name": username,
            "ddlItems": ddlItems
        },
        success: function (data) {
            console.log("Deadline sync: " + data);
            fetchDdl();
        },
        error: function () {
            console.log("error");
        }
    })

}

function fetchDdl(){
    var username = $("#userBtn").attr("username");
    $.ajax({
        type: "POST",
        url: "./external/listDeadline.php",
        dataType: "text",
        data: {
            "user_name": username
        },
        success: function (data) {
            if(data!=""&&data!="No login"&&data!="Username Error")
                loadDdl(data);
            else{
                console.log(data);
            }
        },
        error: function () {
            console.log("error");
        }
    })

}

function loadDdl(data){
    var items = JSON.parse(data)[0];
    var undone = items["undone"];
    var done = items["done"];

    $("#ddl-undone").empty();
    $("#ddl-done").empty();
    $.each(undone, function(i, ddl){
        var content = ddl.deadline_detail;
        var dueDate = ddl.due_date;
        addNewDdlItem(content, dueDate, 1);
    });
    $.each(done, function(i, ddl){
        var content = ddl.deadline_detail;
        var dueDate = ddl.due_date;
        addNewDdlItem(content, dueDate, 2);
    });
    $(".ddl-sync").on("click", function () {
        setTimeout(function(){
            syncDdl();
        }, 20);
    });
}

function addNewDdlItem(content, dueDate, status){
    var newItem = $("<li/>").addClass("ddlItem").attr("content", content).attr("date", dueDate).attr("status", status);
    newItem.append("<div class='form-check'><label class='form-check-label'><input class='checkbox ddl-sync' type='checkbox' />" + dueDate.substring(5)+"&nbsp&nbsp"+content + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline ddl-sync'></i>");
    if(status==2){
        $($(newItem).find(".checkbox")).attr('checked', 'checked');
        $(newItem).closest("li").addClass('completed');
        $("#ddl-done").append(newItem);
    }
    else
        $("#ddl-undone").append(newItem);

}

function addDeadLine(){
    var username = $("#userBtn").attr("username");
    var detail = $("#ddl-detail").val();
    var date = $("#ddlDate").val();
    var newDate = new Date(date);
    var due_date = newDate.getFullYear()+"-"+((newDate.getMonth()+1)<10 ? '0' : '') + (newDate.getMonth()+1) + '-' +
    (newDate.getDate()<10 ? '0' : '') + newDate.getDate();
    if(detail!=""&&date!=""){
        $.ajax({
            type: "POST",
            url: "./external/addDeadline.php",
            dataType: "text",
            data: {
                "user_name": username,
                "detail": detail,
                "date": due_date
            },
            success: function (data) {
                if(data=="success"){
                    setTimeout(function(){
                        $(".deadlineHint").addClass("hide").html();        
                        closeForm();
                        $("#deadlineForm").addClass("hide");
                        $("#deadlineForm").removeClass("block-flex");  
                        fetchDdl();
                    }, 50);
                }
                console.log(data);
                $(".deadlineHint").removeClass("hide").html(data);
            },
            error: function () {
                console.log("error");
            }
        })

    }
}