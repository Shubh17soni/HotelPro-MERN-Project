const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
exports.dashboard = async (_req, res) => {
  const [users, rooms, bookings, activeBookings, revenue] = await Promise.all([
    User.countDocuments(), Room.countDocuments(), Booking.countDocuments(),
    Booking.countDocuments({ status: 'Active' }),
    Booking.aggregate([{ $match: { status: 'Active' } }, { $group: { _id: null, total: { $sum: '$totalAmount' } } }])
  ]);
  res.json({ users, rooms, bookings, activeBookings, revenue: revenue[0]?.total || 0 });
};
exports.users = async (_req, res) => res.json(await User.find().select('-password').sort({ createdAt: -1 }));
exports.bookings = async (_req, res) => res.json(await Booking.find().populate('room user', 'roomNumber type name email').sort({ createdAt: -1 }));
