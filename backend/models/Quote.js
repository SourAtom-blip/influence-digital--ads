import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  title:      { type: String, trim: true },
  email:      { type: String, required: true, trim: true },
  company:    { type: String, trim: true },
  telephone:  { type: String, trim: true },
  location:   { type: String, trim: true },
  targetArea: { type: String, required: true },
  duration:   { type: String, required: true },
  status:     { type: String, enum: ['Pending', 'Reviewed', 'Contacted'], default: 'Pending' },
}, { timestamps: true });

quoteSchema.index({ createdAt: -1 });
quoteSchema.index({ status: 1 });

export default mongoose.model('Quote', quoteSchema);
