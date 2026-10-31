const Room = require('../models/Room');
const Booking = require('../models/Booking');
exports.listRooms = async (req, res) => {
  const { search, type } = req.query;
  const filter = { status: 'Available' };
  if (type && type !== 'All') filter.type = type;
  if (search) filter.$or = [{ roomNumber: new RegExp(search, 'i') }, { type: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }];
  const rooms = await Room.find(filter).sort({ rent: 1 });
  res.json(rooms);
};
exports.getRoom = async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json(room);
};
exports.createRoom = async (req, res) => {
  try { res.status(201).json(await Room.create(req.body)); }
  catch (e) { res.status(400).json({ message: e.code === 11000 ? 'Room number already exists' : e.message }); }
};
exports.updateRoom = async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json(room);
};
exports.deleteRoom = async (req, res) => {
  const active = await Booking.exists({ room: req.params.id, status: 'Active', toDate: { $gte: new Date() } });
  if (active) return res.status(409).json({ message: 'Room has an active booking and cannot be deleted' });
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: 'Room deleted' });
};
