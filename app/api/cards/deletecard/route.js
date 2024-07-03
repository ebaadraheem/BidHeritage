import { NextResponse } from "next/server";
import { deleteCard } from "../../CardsManagement";
export async function DELETE(req) {
    try {
        const body = await req.json();
        const { postId } = body;
        const deletedUser = await deleteCard(postId);
        return NextResponse.json({ success: true, data: deletedUser });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}