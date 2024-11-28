const multer = require("multer");
//store banana
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cb se main kaam hai
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        //unique banana hai file ke naam ko
        const uniqueString = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        const uniqueFile = `${uniqueString}-${file.originalname}`
        cb(null, uniqueFile);
    },
})

const Upload = multer({ storage })
module.exports = Upload;