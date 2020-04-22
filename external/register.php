<?php
include_once('../core/UserSql.php');

session_start();
$user_name = $_POST['user_name'];
$user_password_hash = $_POST['user_password_hash'];
$user_email = $_POST['user_email'];



$register = new UserSql();
if($register->findUser($user_name)!=""||$register->findEmail($user_email)!=""){
    $status_code = 10; // username or email exists
}
else{
    if($register->insertUser($user_name, $user_password_hash, $user_email)){
        $status_code = 11; //success
        $_SESSION["login"] = true;
        $_SESSION["username"] = $user_name;
    }
    else{
        $status_code = 12; //(unkown) error
    }
}

echo $status_code;

?>