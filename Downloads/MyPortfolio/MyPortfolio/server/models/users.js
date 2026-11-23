import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'user' },
  created: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);