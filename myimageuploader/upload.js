const util = require("util")
const multer = require("multer")
const maxSize = 2 * 1024 * 1024

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/shared/incoming/")
  },
  filename: (req, file, cb) => {
    console.log(req.body.category + '_' + file.originalname)    
    cb(null, req.body.category.toLowerCase() + '_' +  file.originalname)
  },
})

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file")

let uploadFileMiddleware = util.promisify(uploadFile)
module.exports = uploadFileMiddleware
