import mongoose from "mongoose";

const { Schema } = mongoose;

const cardSchema = new Schema({
    contact_message: { type: String },
    date: { type: String },
    email: { type: String },
    name: { type: String },
    time: { type: String },
    uniqueId: { type: String }
});

const ContactForm = mongoose.models.ContactForm || mongoose.model('ContactForm', cardSchema);
export default ContactForm;
