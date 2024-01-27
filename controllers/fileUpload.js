const File = require("../models/File");
const cloudinary = require("cloudinary").v2


//local file upload
exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;


        file.mv(path, (error) => {
            console.log(error);
        })

        res.json({
            success: true,
            message: "local file uploaded"
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "local file not uploaded"
        })
    }
}


function isFileTypeSupported(fileType, supportedTypes, quality) {
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

//image upload cloudinary
exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files.imageFile;

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "file type not supported"
            })
        }

        const response = await uploadFileToCloudinary(file, "FirstFolder");


        const fileData = await File.create({
            name, tags, email, fileUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image uploaded successfully"
        })
    }
    catch (error) {
        console.error("error in image upload");
        res.status(400).json({
            success: false,
            message: "Something went wrong while uploading image"
        })
    }
}


//video upload
exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files.videoFile;

        const supportedTypes = ["mp4", "mkv", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "file type not supported"
            })
        }

        const response = await uploadFileToCloudinary(file, "FirstFolder");


        const fileData = await File.create({
            name, tags, email, fileUrl: response.secure_url
        })

        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: "video uploaded successfully"
        })
    }
    catch (error) {
        console.error("error in video upload");
        res.status(400).json({
            success: false,
            message: "Something went wrong while uploading video"
        })
    }
}


//reduced imageUpload
exports.reducedImageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files.imageFile;

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "file type not supported"
            })
        }

        const response = await uploadFileToCloudinary(file, "FirstFolder" ,100);


        const fileData = await File.create({
            name, tags, email, fileUrl: response.secure_url
        })

        res.json({
            success: true,
            reducedImageUrl: response.secure_url,
            message: "reduced Image uploaded successfully"
        })
    }
    catch (error) {
        console.error("error in reduced image upload");
        res.status(400).json({
            success: false,
            message: "Something went wrong while uploading reduced image"
        })
    }
}