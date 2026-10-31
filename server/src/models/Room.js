const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  rent: { type: Number, required: true, min: 0 },
  count: { type: Number, default: 1, min: 1 },
  description: { type: String, default: '' },
  photos: [{ type: String }],
  amenities: [{ type: String }],
  status: { type: String, enum: ['Available', 'Maintenance'], default: 'Available' }
}, { timestamps: true });
module.exports = mongoose.model('Room', roomSchema);
