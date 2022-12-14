<?php
namespace Src\System;

class DbConn {

    private $dbConnection = null;

    public function __construct()
    {
        $host = getenv('DB_HOST');
        $db = getenv('DB_DATABASE');
        $user = getenv('DB_USERNAME');
        $pass = getenv('DB_PASSWORD');
        $port = getenv('DB_PORT');

        try{
            $this->dbConnection = new \PDO(
                "mysql:host=$host;port=$port;charset=utf8mb4;dbname=$db",
                $user,
                $pass
            );
        } catch(\PDOException $e){
            exit($e->getMessage());
        }
    }

    public function getConnection()
    {
        return $this->dbConnection;
    }
}