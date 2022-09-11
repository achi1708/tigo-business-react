<?php
require 'vendor/autoload.php';
use Dotenv\Dotenv;
use Src\System\DbConn;

$dotenv = new Dotenv(__DIR__);
$dotenv->load();

$dbConnection = (new DbConn())->getConnection();