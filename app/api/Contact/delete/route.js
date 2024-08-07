import { NextResponse } from "next/server";
import ContactForm from "@/app/models/ContactForm";
import connectDB from "@/app/lib/mongodb";

export async function DELETE(req) {    
    await connectDB()
    try {
        const body = await req.json();
        const {uniqueId}=body
        const deletedUser = await ContactForm.findOneAndDelete({uniqueId:uniqueId});
        return NextResponse.json({ success: true, data: deletedUser });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
