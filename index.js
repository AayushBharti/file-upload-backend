//app create
const express = require("express")
const app = express()

//port finding
require("dotenv").config()
const PORT = process.env.PORT || 3000

//middleware add
app.use(express.json())
const fileUpload = require("express-fileupload")
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
)

//db connection
const db = require("./config/database")
db.DBconnect()

//cloud connection
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect()

//api route mounting
const Upload = require("./routes/FileUpload")
app.use("/api/v1/upload", Upload)

//activate server
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`)
})
