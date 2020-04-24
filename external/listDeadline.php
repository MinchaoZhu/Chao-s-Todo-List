<?php
include_once('../core/TodoSql.php');

session_start();


function sync(){
    if(isset($_SESSION["login"])&&$_SESSION["login"]==true){
        $username = $_POST["user_name"];
        if($username==$_SESSION["username"]){
            $todoSql = new TodoSql();
            $rawItemsArr = $todoSql->listDeadline($username);
            $undoneItems = $rawItemsArr[0];
            if($undoneItems=="")
                $undoneItems="[]";
            $doneItems = $rawItemsArr[1];
            if($doneItems=="")
                $doneItems = "[]";
            $result = '[{"undone":'.$undoneItems.',"done":'.$doneItems.'}]';
            return $result;
        }
        else{
            return "Username Error";
        }
    }
    else{
        return "No login";
    }
}

echo sync();

?>