import { findHighestLowestBidder } from "../BiddersDataManagement";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        const body = await req.json();
        const res = await findHighestLowestBidder(body.specificId);
        return NextResponse.json({ success: true, data: res });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}