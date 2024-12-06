const app = require("./app");
const env = require('dotenv');//import .env file
const Mongoose = require("mongoose");//import mongoose
env.config();
Mongoose.connect(process.env.MONGO_URI).then(() => { console.log("Connect mongo") }).catch(err => console.log(err))
app.listen(process.env.Port, () => {
    console.log(`Server run at port ${process.env.Port}`);
})