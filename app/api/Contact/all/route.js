import { NextResponse } from "next/server";
import ContactForm from "@/app/models/ContactForm";
import connectDB from "@/app/lib/mongodb";

export async function POST(req) {  
    await connectDB()
  try {
    const messages=await req.json()
    console.log("Message is ",messages)
    const AllCards = await ContactForm.find();
    if (AllCards) {
      return NextResponse.json({ success: true, cards: AllCards });
    } else {
      return NextResponse.json({ success: false, error: "No categories found" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

