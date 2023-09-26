import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        uniqui:true
    },
    email:{
        type:String,
        required:true,
        uniqui:true
    },
    password:{
        type:String,
        required:true,
    },
});

const User = mongoose.models.users || mongoose.model("users",userSchema);
export default User;