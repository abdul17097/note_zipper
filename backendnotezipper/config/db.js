const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true
        });
        console.log(`MongoDB Connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error Message ${error.message}`);
        process.exit();
    }
}


module.exports = connectDB