import mongoose from "mongoose";

export const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("mongo_db connected");
        })
    } catch (error) {
        console.log("somthing goes worng")
        console.log(error);
    }
}