import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Card from "@/app/models/Card";

export async function POST(req) {
    
  await connectDB();
    try {
        const body = await req.json();
        const dt = await Card.find({createrId : body.Id});
        return NextResponse.json({ success: true, data: dt });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}