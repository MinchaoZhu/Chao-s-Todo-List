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

    function dateRange($start_date, $end_date){
        $stimestamp = strtotime($start_date);
        $etimestamp = strtotime($end_date);
        // 计算日期段内有多少天
        $days = ($etimestamp-$stimestamp)/86400+1;
        // 保存每天日期
        $date = array();
        for($i=0; $i<$days; $i++){
            $date[] = date('Y-m-d', $stimestamp+(86400*$i));
        }
        return $date;
    }

    function addRegularTask($user_name, $todo_detail, $start_date, $end_date){
        $sql = sprintf("insert into `regular_todo_list` values (null, '%s', '%s', '%s', '%s');", $user_name, $todo_detail, $start_date, $end_date);
        $dateArr = $this->dateRange($start_date, $end_date);
        foreach($dateArr as $date){
            $itemSql = sprintf("insert into `todo_list` values (null, '%s', '%s', '1', '%s', '255');", $user_name, $todo_detail, $date);
            $sql .= $itemSql;
        }
        return $this->conn->query_transaction($sql);
    }


}
?>
