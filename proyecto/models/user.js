const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos",{ useMongoClient: true,});
mongoose.Promise = global.Promise;

var user_schema = new Schema({
    name: String,
    last_name: String,
    username: {
        type: String, 
        required: true, 
        maxlength:[50,"Username muy largo"]
    },
    age: {
        type: Number, 
        min:[5,"La edead no puede ser menor que 5"],
        max:[100,"La edad no puede ser mayor que 100"]
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required:true,
        minlength:[8,"Password minimo 8 caracteres"]/*,
        validate: {
            validator: (p) => {
                return this.password_confirmation == p;
            },
            message: "Las contraseñas no son iguales"
        }*/
    },
    date_of_birth: Date,
    sex: {
        type: String,
        enum: {
            values: ["M","F"],
            message: "opción no válida"
        }
    }
});


user_schema.virtual("password_confirmation").get( ()=> {
    return this.p_c;
}).set((password) => {
    this.p_c = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;