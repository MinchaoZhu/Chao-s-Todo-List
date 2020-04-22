<?php
include_once('MysqlConnector.php');

class UserSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector();
    }

    function findUser($user_name){
        $sql = sprintf("select  user_id, user_name, user_email  from user where user_name = '%s'", $user_name);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function findEmail($user_email){
        $sql = sprintf("select  user_id, user_name, user_email  from user where user_email = '%s'", $user_email);
        $result = $this->conn->query_json($sql);
        return $result;
    }

    function insertUser( $user_name, $password_hash, $user_email){
        $sql = sprintf("insert into user values(null, '%s', '%s', '%s')",  $user_name, $password_hash, $user_email);
        return $this->conn->query($sql);
    }

    function checkPasswordHash($user_name, $password_hash_input){
        $sql = sprintf("select user_password_hash from user where user_name = '%s'", $user_name);
        $result = $this->conn->query_json($sql);
        if($result==""||$result==false){
            return false;
        }
        else{
            $jsonObj = json_decode($result);
            $password_hash_stored = $jsonObj[0]->user_password_hash;
            return ($password_hash_input == $password_hash_stored);
        }


    }
}
?>
