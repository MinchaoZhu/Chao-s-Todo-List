<?php
include_once('../core/TodoSql.php');

session_start();


function sync(){
    if(isset($_SESSION["login"])&&$_SESSION["login"]==true){
        $username = $_POST["user_name"];
        if($username==$_SESSION["username"]){
            $todoSql = new TodoSql();
            $date = $_POST["date"];
            $result = $todoSql->listTodoByDate($username, $date);
            return $result;
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