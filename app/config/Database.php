<?php

class Database
{
    private $host = "localhost";
    private $user = "root";
    private $pass = "1234";
    private $dbname = "prueba";
    private $port = 3306;
    public $conn;

    public function __construct()
    {
        $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->dbname, $this->port);

        if ($this->conn->connect_error) {
            die("Conexión fallida: " . $this->conn->connect_error);
        }
    }

    public function getConnection()
    {
        return $this->conn;
    }

    public function closeConnection()
    {
        $this->conn->close();
    }
}
