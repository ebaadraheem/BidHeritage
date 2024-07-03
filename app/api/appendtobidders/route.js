import { NextResponse } from "next/server";
import { appendToBidderArray } from "../BiddersDataManagement";
export async function POST(req) {
    try {
        const body = await req.json();
        const res = await appendToBidderArray(body.specificId,body.data);
        return NextResponse.json({ success: true, data: res });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}