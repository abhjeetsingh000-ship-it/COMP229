import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  contactNumber: String,
  message: String,
  created: { type: Date, default: Date.now }
});

export default mongoose.model('Contact', contactSchema);