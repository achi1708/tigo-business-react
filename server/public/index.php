<?php
require "../bootstrap.php";

$router = new \Bramus\Router\Router();

function sendCorsHeaders() {
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");
}

$router->setBasePath('/server');

$router->before('GET', '/.*', function () {
    sendCorsHeaders();
});
    
$router->before('POST', '/.*', function () {
    sendCorsHeaders();
});

$router->options('/.*', function () {
    sendCorsHeaders();
});
    
sendCorsHeaders();

$router->get('/', function(){
    echo "Tigo Business";
});

$router->setNamespace('Src\Controllers');
$router->post('/participant', 'ParticipantController@save');
$router->post('/participant/{id}', 'ParticipantController@update');
$router->post('/code/{checkCode}', 'CodeController@verify');

$router->set404(function() {
    header('HTTP/1.1 404 Not Found');
    // ... do something special here
    exit("Sorry pal!");
});

$router->run();