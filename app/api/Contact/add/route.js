import ContactForm from "@/app/models/ContactForm";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";

export async function POST(req) {
    await connectDB()
    try {
        const body = await req.json();
        const dt = await ContactForm.create(body);
        return NextResponse.json({ success: true, data: dt });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
