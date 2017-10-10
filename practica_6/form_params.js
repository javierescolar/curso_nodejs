var http  = require("http"),
    fs    = require("fs"),
    parser = require("./params_parser.js");
    
 

 http.createServer((req,res) => {
    fs.readFile("./index.html",(err,html) => {
        
       var html_string = html.toString();
     
       var variables = html_string.match(/[^\{\}]+(?=\})/g);
       var nombre = "";
       var apellidos = "";
       
       
       var parametros = parser.parse(req);
       
       
       //remplaza las variables
        for(var i = variables.length -1; i >= 0; i--){
            var variable = variables[i];
            html_string = html_string.replace("{"+variables[i]+"}",parametros[variable]);
        }
       
       //mandamos el contenido
        res.writeHead(200, {"Content-Type":"text/html"});
        res.write(html_string);
        res.end();
    });
 }).listen(process.env.PORT, process.env.IP);

