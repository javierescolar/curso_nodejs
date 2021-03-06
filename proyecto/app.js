const express = require("express");
const bodyParser = require("body-parser");
var User = require("./models/user").User;
var cookieSession = require("cookie-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");
var methodOverride = require("method-override");
var formidable = require("express-form-data");
const app = express();


app.use(express.static('public'));

app.use(bodyParser.json());//peticiones JSON
app.use(bodyParser.urlencoded({extened: true}));

app.use(methodOverride("_method"));

app.use(formidable.parse({ keepExtensions:true }));

app.set("view engine","jade");

app.use(cookieSession({
    name: "session",
    keys: ["llave-1","llave-2"]
}));

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/singup", (req,res) => {
    res.render("singup");
});

app.get("/login", (req,res) => {
    res.render("login");
});

app.post("/users", (req,res) => {
    var user = new User({
        email:req.body.email, 
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        username: req.body.username
    });
    
    user.save().then(function(us){
        res.send("Guardamos tus datos");
    },function(err){
        res.send("NO guardamos tus datos");
    });
});

app.post("/sessions", (req,res) => {
    User.findOne({
         email:req.body.email, 
        password: req.body.password
    },
    function(err,user){
        req.session.user_id = user._id;
        res.redirect("/app");
    });
});

app.get("/users", (req,res) => {
   User.find((err,doc)=> {
       res.send(doc);
   });
});

app.use("/app",session_middleware);
app.use("/app",router_app);

app.listen(process.env.PORT, process.env.IP);