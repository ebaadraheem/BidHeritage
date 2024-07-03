
import { NextResponse } from "next/server";
import UserInfo from "@/app/models/UserInfo";
export async function POST(req) {
    try {
        const data = await req.json();
        const { createrId } = data;
        const result = await UserInfo.findOneAndUpdate(
            { createrId },
            data,
            { new: true, upsert: true }
        );

        if (!result) {
           
            return NextResponse.json({ success: false, error: "No result found" });
        }

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error creating RawData', error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
