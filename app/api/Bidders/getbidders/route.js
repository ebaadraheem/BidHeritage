import { NextResponse } from "next/server";
import Bidders from "@/app/models/Bidders";
import connectDB from "@/app/lib/mongodb";
export async function POST(req) {
    await connectDB()
    try {
        const fetchdata = await req.json();
        const dt = await Bidders.find({ specificId: { $in: fetchdata.Id } });
        return NextResponse.json({ success: true, data: dt });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
