const Booking = require('../models/Booking');
const Room = require('../models/Room');

exports.createBooking = async (req, res) => {
  try {
    const { roomId, fromDate, toDate, guestName, customerPhone } = req.body;
    const start = new Date(fromDate), end = new Date(toDate);
    if (!roomId || !guestName || !fromDate || !toDate || Number.isNaN(+start) || Number.isNaN(+end) || end <= start)
      return res.status(400).json({ message: 'Enter valid guest details and dates' });
    const room = await Room.findById(roomId);
    if (!room || room.status !== 'Available') return res.status(404).json({ message: 'Room is unavailable' });
    const overlap = await Booking.exists({ room: roomId, status: 'Active', fromDate: { $lt: end }, toDate: { $gt: start } });
    if (overlap) return res.status(409).json({ message: 'This room is already booked for those dates' });
    const totalDays = Math.ceil((end - start) / 86400000);
    const booking = await Booking.create({ room: roomId, user: req.user._id, fromDate: start, toDate: end, totalDays, totalAmount: totalDays * room.rent, guestName, customerPhone: customerPhone || req.user.phone });
    res.status(201).json(await booking.populate('room'));
  } catch (e) { res.status(400).json({ message: e.message }); }
};
exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('room').sort({ createdAt: -1 });
  res.json(bookings);
};
exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (booking.status === 'Cancelled') return res.status(400).json({ message: 'Booking is already cancelled' });
  booking.status = 'Cancelled'; await booking.save();
  res.json({ message: 'Booking cancelled', booking });
};
