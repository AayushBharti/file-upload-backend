const File = require("../models/File")

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file
    const file = req.files.file
    console.log("File ->", file)

    //create path where file need to be stored on server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`
    // __dirname = curr working dir
    console.log("Path ->", path)

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
