"use server"
import mongoose from "mongoose";

const { Schema } = mongoose;

const cardSchema = new Schema({
  createrId: { type: String, required: true },
  name: { type: String, required: true },
  profileimg: { type: String },
  bio: { type: String },
  city: { type: String }
});


const UserInfo = mongoose.models.UserInfo || mongoose.model('UserInfo', cardSchema);

export default UserInfo;


