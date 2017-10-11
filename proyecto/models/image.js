const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos",{ useMongoClient: true,});
mongoose.Promise = global.Promise;

var img_schema = new Schema({
    title : {type: String, required: true}
});

var Image = mongoose.model("Image", img_schema);

module.exports.Image = Image;