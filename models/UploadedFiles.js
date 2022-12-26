const mongoose =  require("mongoose") ; 


const UploadedFilesSchema  =  new mongoose.Schema({
    path: String , 
    folder: String , 
    type: String , 
    size: String , 
    filename: String , 
}); 


const UploadedFiles =  mongoose.model("uploadedFiles" , UploadedFilesSchema ) ; 

module.exports = UploadedFiles ; 