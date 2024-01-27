const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fileUrl:{
        type:String,
        // required:true
    },
    tags:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
})

// const File = mongoose.model("File", fileSchema);
// module.exports = File;

module.exports = mongoose.model("File", fileSchema);