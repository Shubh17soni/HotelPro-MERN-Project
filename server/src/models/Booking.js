const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  totalDays: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  customerPhone: { type: String, default: '' },
  guestName: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Cancelled'], default: 'Active' },
  paymentStatus: { type: String, enum: ['Demo unpaid', 'Demo paid'], default: 'Demo unpaid' }
}, { timestamps: true });
module.exports = mongoose.model('Booking', bookingSchema);
