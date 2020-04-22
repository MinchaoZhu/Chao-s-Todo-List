<?php
include_once('MysqlConnector.php');

class TodoSql{
    private $conn;
    function __construct(){
        $this->conn = new MysqlConnector();
    }

    function clearTodo($user_name, $date){
        $sql = sprintf("delete from `todo_list` where `user_name`='%s' and `date`='%s'", $user_name, $date);
        return $this->conn->query($sql);
    }

    function insertTodo($user_name, $todo_detail, $todo_status, $date, $serial){
        $sql = sprintf("insert into `todo_list` values (null, '%s', '%s', '%s', '%s', '%s')", $user_name, $todo_detail, $todo_status, $date, $serial);
        return $this->conn->query($sql);
    }

    function syncTodo($user_name, $date, $todoList){
        $sql = sprintf("delete from `todo_list` where `user_name`='%s' and `date`='%s';", $user_name, $date);
        for($i = 0; $i<count($todoList); $i++){
            $todo_detail = $todoList[$i]["detail"];
            $todo_status = $todoList[$i]["status"];
            $todo_serial = $todoList[$i]["serial"];
            $itemInsertSql  = sprintf("insert into `todo_list` values (null, '%s', '%s', '%s', '%s', '%s');", $user_name, $todo_detail, $todo_status, $date, $todo_serial);
            $sql = $sql.$itemInsertSql;
        }
        return $this->conn->query_transaction($sql);
    }

    function listTodoByDate($user_name, $date){
        $sql = sprintf("select * from `todo_list` where `user_name`='%s' and `date`='%s' order by `serial` asc", $user_name, $date);
        return $this->conn->query_json($sql);
    }

    function testTransaction(){
        $sql = sprintf("insert into `user` values(null, 'fosao','saadsadsa', 'dasdadsdsa');insert into `user` values(null, 'foo','sadsadsa', 'dasdasdsa');");
        return $this->conn->query_transaction($sql);
    }

}
?>
