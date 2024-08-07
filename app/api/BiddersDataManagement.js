
import connectDB from "../lib/mongodb";
import Bidders from "../models/Bidders";
export const AddToBidderCollection = async (data) => {
    await connectDB();
    
    try {
        const result = await Bidders.create(data)

        if (!result) {
            throw new Error('Document not found');
        }
        return { success: true, data: result };
    } catch (error) {
        console.error('Error appending to data array:', error);
        return { success: false, error: error.message };
    }
};

export const appendToBidderArray = async (specificId, newObject) => {
    await connectDB();
    try {
        const result = await Bidders.findOneAndUpdate(
            { specificId },
            { $push: { info: newObject } },
            { new: true }
        );
        if (!result) {
            throw new Error('Document not found');
        }

        return { success: true, data: result };
    } catch (error) {
        console.error('Error appending to data array:', error);
        return { success: false, error: error.message };
    }
};

export const findHighestLowestBidder = async (Id) => {
    await connectDB();
    try {

        const document = await Bidders.findOne({ specificId: Id });

        if (!document) {
            throw new Error('Document not found');
        }

         if (!Array.isArray(document.info) || document.info.length === 0) {
            const highestValueObject = {
                Bid: "10",
                Name: "Unknown",
                uniqueId: "00000000-0000-0000-0000-000000000000"
            };

            const lowestValueObject = {
                Bid: "10",
                Name: "Unknown",
                uniqueId: "00000000-0000-0000-0000-000000000000"
            };

            return { success: true, data: { highestValueObject, lowestValueObject } };
        }
        let highestValueObject = null;
        let lowestValueObject = null;

        for (const item of document.info) {
            const bidValue = parseFloat(item["Bid"]);
            if (isNaN(bidValue)) continue; // Skip if bid is not a valid number

            if (highestValueObject === null || (bidValue > parseFloat(highestValueObject["Bid"]))) {
                highestValueObject = item;
            }

            if (lowestValueObject === null || (bidValue < parseFloat(lowestValueObject["Bid"]))) {
                lowestValueObject = item;
            }
        }

        if (highestValueObject) {
            const { BidderId, PhoneNo, ...rest } = highestValueObject;
            highestValueObject = { ...rest };
        }

        if (lowestValueObject) {
            const { BidderId, PhoneNo, ...rest } = lowestValueObject;
            lowestValueObject = { ...rest };
        }

        return { success: true, data: { highestValueObject, lowestValueObject } };
    } catch (error) {
        console.error('Error finding highest/lowest bidder:', error);
        return { success: false, error: error.message };
    }
};

