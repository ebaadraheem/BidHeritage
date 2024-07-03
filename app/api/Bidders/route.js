import { NextResponse } from "next/server";
import { AddToBidderCollection } from "../BiddersDataManagement";
export async function POST(req) {
    try {
        const fetchdata = await req.json();
        const newUser = await AddToBidderCollection(fetchdata);
        return NextResponse.json({ success: true, data: newUser });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}