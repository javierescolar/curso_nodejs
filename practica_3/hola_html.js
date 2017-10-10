var http = require("http"),
    fs   = require("fs");

 http.createServer((req,res) => {
    fs.readFile("./index.html",(err,html) => {
        res.writeHead(200, {"Content-Type":"application/json"});
        res.write(JSON.stringify({"nombre":"Javier","apellidos":"Escolar Salcedo"}));
        res.end();
    });
 }).listen(process.env.PORT, process.env.IP);

