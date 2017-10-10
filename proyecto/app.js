const express = require("express");
const bodyParser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");
const app = express();


app.use(express.static('public'));

app.use(bodyParser.json());//peticiones JSON
app.use(bodyParser.urlencoded({extened: true}));

app.set("view engine","jade");
app.use(session({
    secret: "123asd123asd",
    resave: false,
    saveUninitialized: false
}));

app.get("/", (req,res) => {
    console.log(req.session.user_id)
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
   /* user.save( (err,user,numero) => {
        if (err){
            console.log(String(err));
            res.render("login");
        } else {
            res.send(JSON.stringify(user));
        }
        
    });*/
    
    user.save().then(function(us){
        res.send("Guardamos tus datos");
    },function(err){
        console.log(String(err));
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
        res.send(user);
    });
});

app.get("/users", (req,res) => {
   User.find((err,doc)=> {
       res.send(doc);
   });
});

app.listen(process.env.PORT, process.env.IP);