"use server"
import mongoose from "mongoose";

const { Schema } = mongoose;

const cardSchema = new Schema({

  specificId: String,
  title: String,
  images: {
    type: Array,
    required: true
  },
  description: String,
  createrId: String,
  owner: {
    type: Object,
  }
});


const Card = mongoose.models.Card || mongoose.model('Card', cardSchema);

export default Card;

