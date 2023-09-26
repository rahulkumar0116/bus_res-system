import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    busNo:{
        type:String,
        required:true,
        uniqui:true
    },
    capcity:{
        type:Number
    },
    price:{

    }
})