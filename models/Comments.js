const mongoose = require("mongoose");

var CommentsSchema = new mongoose.Schema({
    icon : String , 
    user_name: String , 
    description : String 
},
{
    collection:"comments",
});

var Comments = mongoose.model("comments", CommentsSchema);
module.exports = Comments; 