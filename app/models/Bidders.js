"use server"
import mongoose from "mongoose";

const { Schema } = mongoose;

const cardSchema = new Schema({

  specificId: { type: String, required: true },
  info: {
    type: Array,
    required: true
  }

});


const Bidders = mongoose.models.Bidders || mongoose.model('Bidders', cardSchema);

export default Bidders;

