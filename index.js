//app create
const express = require("express")
const app = express()

//port finding
require("dotenv").config()
const PORT = process.PORT

//middleware add
app.arguments(express.json())
const fileupload = require("express-fileupload")
app.use(fileupload())

//db connection
require("./config/database").DBconnect()

//cloud connection
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect()

//api route mounting
const Upload = require("./routes/FileUpload")
app.use("api/v1/upload", Upload)

//activate server
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`)
})
