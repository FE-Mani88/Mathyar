import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return false
        } else {
            await mongoose.connect(process.env.MONGO_URL)
            console.log('Connected To Database Successfully :)')
            return true
        }
    } catch (error) {
        console.log('Unexpected Error... :(')
        return false
    }
}

export default connectToDB;