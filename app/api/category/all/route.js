
import { NextResponse } from "next/server";
import Category from "@/app/models/Category";
export async function POST(req) {
    try {
        const messages=await req.json()
        console.log("Message is ",messages)
        const card = await Category.findOne();

        if (card) {
            return NextResponse.json({ success: true, categories: card.categories });
        } else {
            return NextResponse.json({ success: false, error: "No categories found" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
