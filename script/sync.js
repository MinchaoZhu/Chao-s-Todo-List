$(document).ready(function () {
    $(".sync").on("click", function () {
        sync();
    });
});



function sync() {
    setTimeout(syncContent, 100);
}

function syncContent() {
    var username = $("#userBtn").attr("username");
    var date = $("#date").attr("date");
    var newDate = new Date(date);
    date = newDate.getFullYear()+"-"+((newDate.getMonth()+1)<10 ? '0' : '') + (newDate.getMonth()+1) + '-' +
    (newDate.getDate()<10 ? '0' : '') + newDate.getDate();
    var todoList = [];
    $(".todoItem").each(function (index, item) {
        var detail = $(item).attr("content");
        var status = $(item).attr("status");
        todoList.push({
            "detail": detail,
            "status": status,
            "serial": index
        });
    });

    if (todoList == "") {
        todoList = "null";
    }
    $.ajax({
        type: "POST",
        url: "./external/syncTodo.php",
        dataType: "text",
        data: {
            "user_name": username,
            "todo_list": todoList,
            "date": date
        },
        success: function (data) {
            console.log("Todo-list sync: " + data);
        },
        error: function () {
            console.log("error");
        }
    })
}

function loadTodoList(date) {
    $('.todo-list').empty();
    var username = $("#userBtn").attr("username");
    var date = $("#date").attr("date");
    var newDate = new Date(date);
    date = newDate.getFullYear()+"-"+((newDate.getMonth()+1)<10 ? '0' : '') + (newDate.getMonth()+1) + '-' +
    (newDate.getDate()<10 ? '0' : '') + newDate.getDate();
    if (username != "" && date != "") {
        $.ajax({
            type: "POST",
            url: "./external/listTodo.php",
            dataType: "text",
            data: {
                "user_name": username,
                "date": date
            },
            success: function (data) {
                if(data=="Username Error"||data=="No login")
                    console.log(data);
                else addItems(data);
            },
            error: function () {
                console.log("error");
            }
        })
    }
}

function addItems(data) {
    if (data != "") {
        var items = JSON.parse(data);
        $.each(items, function (index, item) {
            var detail = item.todo_detail;
            var status = item.todo_status_id;
            addItem(detail, status);

        });

    }
}

function addItem(item, status) {
    var todoListItem = $('.todo-list');
    var todoListInput = $('.todo-list-input');

    var newItem = $("<li/>").addClass("todoItem").attr("content", item).attr("status", status);
    newItem.append("<div class='form-check'><label class='form-check-label'><input class='checkbox sync' type='checkbox' />" + item + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline sync'></i>");
    if (status == 2) {
        $($(newItem).find(".checkbox")).attr('checked', 'checked');
        $(newItem).closest("li").addClass('completed');
    }
    todoListItem.append(newItem);
    todoListInput.val("");
}
