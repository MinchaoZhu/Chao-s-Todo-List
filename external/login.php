<?php
include_once('../core/UserSql.php');

session_start();
if(!isset($_SESSION["login"])||$_SESSION["login"]!=true){
    $_SESSION["login"] = false; // false: unlogined, true: already login
    $username = $_POST['user_name'];
    $password_hash_input = $_POST['user_password_hash'];

    $query = new UserSql();

    $result;
    if($query->checkPasswordHash($username, $password_hash_input)){
        $_SESSION["login"] = true;
        $_SESSION["username"] = $username;
        $result = $_SESSION["username"];
    }
    else{
        session_destroy();
        $result = "null";
    }
    echo $result;
}
else{
    echo "You have already login";
}

?>