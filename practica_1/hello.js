var http = require("http");

var manejador = (solicitud, repuesta) => {
    console.log("Hola Mundo");
     repuesta.end('Hello Mundo en html y cierro la respuesta con el servidor\n');
}

var servidor = http.createServer(manejador);

servidor.listen(process.env.PORT, process.env.IP);