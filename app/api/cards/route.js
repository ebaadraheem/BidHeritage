
import { GetCards, createCard, deleteCard } from "../CardsManagement";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const newUser = await createCard(body);
        return NextResponse.json({ success: true, data: newUser });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
export async function GET() {
    try {
      const AllCards = await GetCards(); 
      return NextResponse.json(AllCards); 
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }); 
    }
  }

