import {connect} from "@/../db/database";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/users";
import bcrypt from "bcryptjs";
import  Jwt  from "jsonwebtoken";

connect();

export async function POST(request){
    try {
        const reqBody = await request.json();
    const{email,password} = reqBody;
    console.log(reqBody);
    const user = await User.findOne({email});

    if(!user){
        return NextResponse.json({Error:"user not found"},{status:400})
    }
    console.log("user exist");

    const validpassword = await bcrypt.compare(password,user.password);
    if(!validpassword){
        return NextResponse.json({Error:"passwor not valid"},{status:400})
    }

    const tokenData ={
        id:user._id,
        username:user.username,
        email:user.email
    }
    const token = Jwt.sign(tokenData, process.env.TOKEN_SECRET,{expiresIn:"1d"})
    const response = NextResponse.json({
        message:"Login successful",
        seccess:true
    })
    response.cookies.set("token",token,{
        httpOnly:true
    })
    return response;
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }

}