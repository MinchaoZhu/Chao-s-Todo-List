<?php
include_once('../core/TodoSql.php');

session_start();


function sync(){
    if(isset($_SESSION["login"])&&$_SESSION["login"]==true){
        $username = $_POST["user_name"];
        if($username==$_SESSION["username"]){
            $todoSql = new TodoSql();
            $date = $_POST["date"];
            $todoList = $_POST["todo_list"];
            if(!$todoSql->clearTodo($username, $date)){
                return "error";
            };
            for($i = 0; $i<count($todoList); $i++){
                $todo_detail = $todoList[$i]["detail"];
                $todo_status = $todoList[$i]["status"];
                $todo_serial = $todoList[$i]["serial"];
                if(!$todoSql->insertTodo($username, $todo_detail, $todo_status, $date, $todo_serial)){
                    return "bbb error";
                };
            }
            return "Success";
        }
        else{
            return "Username Error";
        }
    }
    else{
        return " No login";
    }
}

echo sync();

?>