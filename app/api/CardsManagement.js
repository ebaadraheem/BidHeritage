"use server"
import Card from "../models/Card";
import connectDB from "../lib/mongodb";
export const createCard = async (cardData) => {
  await connectDB();

  try {
    const cards = await Card.create(cardData);
    return { success: true, data: cards };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create card' };
  }
};
export const GetCards = async () => {
  await connectDB();

  try {
    const cards = await Card.find({});
    return { success: true, data: cards };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create card' };
  }
};
export const deleteCard = async (id) => {
  await connectDB();

  try {
    const deletedCard = await Card.findOneAndDelete({specificId : id});
    if (!deletedCard) {
      return { success: false, error: 'Card not found' };
    }
    return { success: true, data: deletedCard };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to delete card' };
  }
};