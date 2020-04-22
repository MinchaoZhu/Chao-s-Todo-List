<?php
class MysqlConnector{
    private $servername;
    private $dbname;
    private $username;
    private $password;
    function __construct(){
        $this->servername = "localhost";
        $this->dbname = "test1";
        $this->username = "test";
        $this->password = "test";
    }

    function query($sql){
        $conn = mysqli_connect($this->servername, $this->username, $this->password, $this->dbname);
        if(!$conn){
            die("Connection failed: " . mysqli_connect_error());
        }
        $result = mysqli_query($conn, $sql);
        $conn->close();
        return $result;
    }

    function query_json($sql){
        $result = $this->query($sql);
        if($result){
            if($result->num_rows>0){
                while($r = mysqli_fetch_assoc($result)){
                    $arr[] = $r; 
                }
                return json_encode($arr);
            }
            else
                return "";
        }
        else{
            return false;
        }
    }

    function query_transaction($sql){
        $conn = mysqli_connect($this->servername, $this->username, $this->password, $this->dbname);
        if(!$conn){
            die("Connection failed: " . mysqli_connect_error());
        }
        $sql = "begin;" . $sql;
        $sqlList = explode(";", $sql);
        foreach($sqlList as $s){
            if(strlen($s)>0){
                if(!mysqli_query($conn, $s)){
                    mysqli_query($conn, "rollback;");
                    $conn->close();
                    return false;
                }
            }
        }
        mysqli_query($conn, "commit;");
        $conn->close();
        return true;
    }

}




?>