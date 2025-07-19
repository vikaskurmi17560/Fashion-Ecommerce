const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueString = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        const uniqueFile = `${uniqueString}-${file.originalname}`
        cb(null, uniqueFile);
    },
})

const Upload = multer({ storage })
module.exports = Upload;