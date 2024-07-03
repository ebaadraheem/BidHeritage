import mongoose from "mongoose";

const { Schema } = mongoose;

const cardSchema = new Schema({
  categories: { type: [String], required: true } // Assuming categories are strings
});

const Category = mongoose.models.Category || mongoose.model('Category', cardSchema);
export default Category;
