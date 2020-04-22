$(document).ready(function(){
    loadToday();
    $("#nextDay").click(function(){
        loadAnotherDay(1);
    });
    $("#previousDay").click(function(){
        loadAnotherDay(-1);
    });
    $("#restoreToday").click(function(){
        loadToday();
        $('.todo-list').empty();
        loadTodoList();
    });
});


function currentDate(){
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    
    var output = (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;
    // var output = d.getFullYear() + '/' +
    // (month<10 ? '0' : '') + month + '/' +
    // (day<10 ? '0' : '') + day;
    return output;
}

function loadToday(){
    var d = new Date();
    $(".date").html(d.toLocaleDateString()).attr("date", d.toLocaleDateString())
              .attr("timestamp", d.getTime());
}

function loadAnotherDay(delta){
    var time = $(".date").attr("timestamp");
    var date = new Date(parseInt(time));
    date=date.setDate(date.getDate()+delta);
    date=new Date(date);
    $(".date").html(date.toLocaleDateString()).attr("date", date.toLocaleDateString())
              .attr("timestamp", date.getTime());
    $('.todo-list').empty();
    loadTodoList();
}
