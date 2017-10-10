var http = require("http"),
    fs   = require("fs");

 http.createServer((req,res) => {
    fs.readFile("./index.html",(err,html) => {
        
       var html_string = html.toString();
       var arreglo_parametros = [], parametros = {};
       var variables = html_string.match(/[^\{\}]+(?=\})/g);
       var nombre = "";
       var apellidos = "";
       if(req.url.indexOf("?") > 0) {
           var url_data = req.url.split("?");
            arreglo_parametros = url_data[1].split("&");
       }
       
       for(var i = arreglo_parametros.length -1; i >= 0; i--){
           var parametro = arreglo_parametros[i];
           var param_data = parametro.split("=");
           parametros[param_data[0]] = param_data[1];
       }
       
       
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

