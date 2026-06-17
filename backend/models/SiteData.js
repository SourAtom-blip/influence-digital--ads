import mongoose from 'mongoose';

// Single document per key: 'content' | 'services' | 'images'
const siteDataSchema = new mongoose.Schema({
  key:   { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

export default mongoose.model('SiteData', siteDataSchema);
