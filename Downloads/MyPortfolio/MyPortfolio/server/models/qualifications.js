import mongoose from 'mongoose';

const qualificationSchema = new mongoose.Schema({
  title: String,
  firstname: String,
  lastname: String,
  email: String,
  completion: String,
  description: String,
  created: { type: Date, default: Date.now }
});

export default mongoose.model('Qualification', qualificationSchema);