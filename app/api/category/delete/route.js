import { NextResponse } from "next/server";
import Category from "@/app/models/Category";
import connectDB from "@/app/lib/mongodb";
// DELETE method to remove a category
export async function DELETE(req) {
    await connectDB()
    try {
        const body = await req.json();
        const { index } = body;

        const card = await Category.findOne();

        if (card) {
            card.categories.splice(index, 1);
            await card.save();
            return NextResponse.json({ success: true, data: card });
        } else {
            return NextResponse.json({ success: false, error: "No card found" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
