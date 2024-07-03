import { NextResponse } from "next/server";
import Category from "@/app/models/Category";

// POST method to add a category
export async function POST(req) {
    try {
        const body = await req.json();
        const { category } = body;
        let card = await Category.findOne(); 

        if (card) {
            card.categories.push(category);
            await card.save();
            return NextResponse.json({ success: true, data: card });
        } else {
            const newCard = new Category({ categories: [category] });
            await newCard.save();
            return NextResponse.json({ success: true, data: newCard });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
