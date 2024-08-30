<?php

//ini_set('display_errors','on');
 // Crear un script para mostrar los usuarios según un id 
  $server= "localhost";
  $username = "florin";
  $password = "florin";
  $database = "Hack4u";

// Conexión a la base de datos
  $conn = new mysqli($server, $username, $password, $database);

  // la variable id va a tomar el valor de id que pasamos por get en la url
  $id = mysqli_real_escape_string($conn, $_GET['id']);

  $data = mysqli_query($conn, "select username from users where id = $id"); //or die(mysqli_error($conn));

  $response = mysqli_fetch_array($data);
  //echo $response['username'];
  if (!isset($response['username'])){
    http_response_code(404);
  }
?> 
