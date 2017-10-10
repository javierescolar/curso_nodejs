var http = require("http"),
    fs   = require("fs");

 http.createServer((req,res) => {
    fs.readFile("./index.html",(err,html) => {
        res.write(html);
        res.end();
    });
 }).listen(process.env.PORT, process.env.IP);

