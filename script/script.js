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
    $(".date").html(d.toLocaleDateString()+" "+d.getDay()+" "+getWeekday(d.getDay())).attr("date", d.toLocaleDateString())
              .attr("timestamp", d.getTime());
}

function loadAnotherDay(delta){
    var time = $(".date").attr("timestamp");
    var date = new Date(parseInt(time));
    date=date.setDate(date.getDate()+delta);
    date=new Date(date);
    $(".date").html(date.toLocaleDateString()+" "+date.getDay()+" "+getWeekday(date.getDay())).attr("date", date.toLocaleDateString())
              .attr("timestamp", date.getTime());
    loadTodoList();
}

function getWeekday(i){
    var weekday = new Array(7);
    weekday[1] = "周一 Mon.";
    weekday[2] = "周二 Tues.";
    weekday[3] = "周三 Wed.";
    weekday[4] = "周四 Thur.";
    weekday[5] = "周五 Fri.";
    weekday[6] = "周六 Sat.";
    weekday[0] = "周日 Sun.";
    return weekday[i];
}