const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

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


//post middleware
fileSchema.post("save", async function(doc) {
    try{
        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });


        //send mail
        let info = transporter.sendMail({
            from: `Markimax | BackEnd`,
            to: doc.email,
            subject: "New file has been uploaded on cloudinary",
            html: `<h2>File Uploaded - ${doc.fileUrl}</h2>`
        })
    }
    catch(error){
        console.log(error);
    }
})

// const File = mongoose.model("File", fileSchema);
// module.exports = File;

module.exports = mongoose.model("File", fileSchema);