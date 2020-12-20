import mongoose from 'mongoose'
let db
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser : true,
            useCreateIndex: true
        })

        db = mongoose.connection

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }

    db.on('error', (err) => {
        console.log(err + 'connection error')
    })

}

export default connectDB