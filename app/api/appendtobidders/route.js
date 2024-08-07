import { NextResponse } from "next/server";
import { appendToBidderArray } from "../BiddersDataManagement";
import connectDB from "@/app/lib/mongodb";

export async function POST(req) {
    await connectDB()
    try {
        const body = await req.json();
        const res = await appendToBidderArray(body.specificId,body.data);
        return NextResponse.json({ success: true, data: res });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
