import {connect} from "@/../db/database";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/users";
import bcrypt from "bcryptjs";




connect()

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {name,username,email,password} = reqBody
        console.log(reqBody);
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"email already exist.."})
        }
        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hasedpassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            name,
            username,
            email,
            password:hasedpassword
        })

        const savedUser = await newUser.save();
        return NextResponse.json({
            message:"User created successfully",
            success:true,
            savedUser
        });
    } catch (error) {
        return NextResponse.json({error:error.message},
            {status:500})
    }
}
