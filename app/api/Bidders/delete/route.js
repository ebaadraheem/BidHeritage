import { NextResponse } from "next/server";
import Bidders from "@/app/models/Bidders";
export async function DELETE(req) {
    try {
        const body = await req.json();
        const  specificId = body.senddata.specificId;
        const uniqueId  = body.senddata.uniqueId;
        try {
            const result = await Bidders.findOneAndUpdate(
                { specificId },
                { $pull: { info: { uniqueId } } },
                { new: true }
            );
          
            if (!result) {
                return NextResponse.json({ success: false, error: "No matching document found." });
            }
            return NextResponse.json({ success: true, data: result });
        } catch (error) {
            return NextResponse.json({ success: false, error: error.message });

        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}