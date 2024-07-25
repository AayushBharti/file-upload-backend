const mongoose = require("mongoose")
const nodemailer = require("nodemailer")

require("dotenv").config()
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
})

//post middleware
fileSchema.post("save", async function (doc) {
  try {
    // console.log("DOC",doc)
    //transporter
    //shift this to config folder
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    //send mail
    let info = await transporter.sendMail({
      from: `Aayush Bharti`,
      to: doc.email,
      subject: "New File Uploaded on Cloudinary",
      html: `<h2>Hey there</h2> <p>File Uploaded Successfully,<a href="${doc.imageUrl}" target="_blank" rel="noopener noreferrer"> View Here </a> </p> `,
    })
    console.log("Info:", info)
  } catch (error) {
    console.log(error)
  }
})

const File = mongoose.model("File", fileSchema)
module.exports = File
