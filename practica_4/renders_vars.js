var http = require("http"),
    fs   = require("fs");

 http.createServer((req,res) => {
    fs.readFile("./index.html",(err,html) => {
        
        let html_string = html.toString();
        //Expresion regular que busca en el HTML donde haya {x}
        let variables = html_string.match(/[^\{\}]+(?=\})/g);
        let nombre = "Javier";
        let apellidos = "Escolar Salcedo";
        
        //remplaza las variables
        for(var i = variables.length -1; i >= 0; i--){
            var value = eval(variables[i]);
            html_string = html_string.replace("{"+variables[i]+"}",value);
        }
        //mandamos el contenido
        res.writeHead(200, {"Content-Type":"text/html"});
        res.write(html_string);
        res.end();
    });
 }).listen(process.env.PORT, process.env.IP);

