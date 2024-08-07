import { NextResponse } from "next/server";
import UserInfo from "@/app/models/UserInfo";
import connectDB from "@/app/lib/mongodb";
export async function POST(req) {
    await connectDB()
    try {
        const data = await req.json();
        // Use findOneAndUpdate with upsert option to replace or create
        const result = await UserInfo.findOne({ createrId: data.createrId })
        if (!result) {
            
            return NextResponse.json({ success: false, error: "No result found" });
        }

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error creating UserInfo', error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
