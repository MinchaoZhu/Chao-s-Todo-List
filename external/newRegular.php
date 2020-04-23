<?php
include_once('../core/TodoSql.php');

session_start();


function newRegular(){
    if(isset($_SESSION["login"])&&$_SESSION["login"]==true){
        $username = $_POST["user_name"];
        if($username==$_SESSION["username"]){
            $todoSql = new TodoSql();
            $start_date = $_POST["start_date"];
            $end_date = $_POST["end_date"];
            $todo = $_POST["todo"];
            if($todoSql->addRegularTask($username,$todo,$start_date,$end_date)){
                return "success";
            }
            else{
                return "false";
            }
        }
        else{
            return "Username Error";
        }
    }
    else{
        return " No login";
    }
}

echo newRegular();

?>