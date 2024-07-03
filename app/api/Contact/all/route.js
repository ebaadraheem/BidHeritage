import { NextResponse } from "next/server";
import ContactForm from "@/app/models/ContactForm";
export async function GET() {
  try {
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

