const File = require("../models/File")
const cloudinary = require("cloudinary").v2

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file
    const file = req.files.file
    console.log("File is here->", file)

    //create path where file need to be stored on server
    // __dirname = curr working dir
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`
    console.log("Path ->", path)

    //add path to the move functions
    file.mv(path, (err) => {
      console.log(err)
    })

    res.json({
      success: true,
      message: "Local file uploaded successfully",
    })
  } catch (err) {
    console.log("not able to upload file on server")
    console.log(error)
  }
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder }
  if (quality) {
    options.quality = quality
  }
  options.resource_type = "auto"
  return await cloudinary.uploader.upload(file.tempFilePath, options)
}

//image upload handler
exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body
    console.log(name, tags, email)

    const file = req.files.imageFile
    console.log(file)

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"]
    const fileType = file.name.split(".")[1].toLowerCase()

    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      })
    }

    //file format supported
    console.log("Uploading to Cloudinary folder")
    const response = await uploadFileToCloudinary(file, "fileUploadProject")
    console.log(response)

    //save entry to db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    })

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image successfully uploaded",
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    })
  }
}

//video upload handler

exports.videoUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body
    console.log(name, tags, email)

    const videoFile = req.files.videoFile

    //validation
    const supportedTypes = ["mp4", "mkv", "webm"]
    const fileType = videoFile.name.split(".")[1].toLowerCase()
    console.log("file type:", fileType)

    //////todo add a upperlimit of 5MB for Video
    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      })
    }

    //file format supported
    console.log("Uploading to Cloudinary folder")
    const response = await uploadFileToCloudinary(
      videoFile,
      "fileUploadProject"
    )
    console.log(response)

    //save entry to db
    const fileData = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
    })
    //or
    // const vidFile = new File({
    //   name,
    //   tags,
    //   email,
    //   fileUrl: response.secure_url,
    // })

    // const file = await vidFile.save()

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Video successfully uploaded",
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    })
  }
}

//imageSizeReducer
exports.imageSizeReducer = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body
    console.log(name, tags, email)

    const file = req.files.imageFile
    console.log(file)

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"]
    const fileType = file.name.split(".")[1].toLowerCase()
    console.log("File type:", fileType)

    // Check file type is supported or not
    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      })
    }

    //file format supported
    // Upload to Cloudinary
    console.log("Uploading to Cloudinary folder")
    const response = await uploadFileToCloudinary(file, "fileUploadProject",30)
    console.log(response)

    //save entry to db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    })

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image successfully uploaded",
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    })
  }
}
