require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Room = require('./models/Room');
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.updateOne({ email: 'admin@hotelpro.com' }, { $set: { name: 'HotelPro Admin', email: 'admin@hotelpro.com', password: await bcrypt.hash('Admin@12345', 12), userType: 'Admin' } }, { upsert: true });
  const rooms = [
    { roomNumber: '101', type: 'Deluxe', rent: 2800, count: 2, description: 'A calm, spacious room with a king bed, work desk and city views.', photos: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900'], amenities: ['King bed','Wi-Fi','Air conditioning','Breakfast'] },
    { roomNumber: '202', type: 'Suite', rent: 5200, count: 3, description: 'An elegant suite with a separate lounge and premium amenities.', photos: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900'], amenities: ['King bed','Lounge','Wi-Fi','Breakfast','Bathtub'] },
    { roomNumber: '303', type: 'Standard', rent: 1800, count: 2, description: 'A comfortable and practical room for a relaxed stay.', photos: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900'], amenities: ['Queen bed','Wi-Fi','Air conditioning'] },
    { roomNumber: '404', type: 'Family', rent: 3900, count: 4, description: 'A bright family room with extra space for everyone.', photos: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900'], amenities: ['Two beds','Wi-Fi','Air conditioning','Breakfast'] }
  ];
  for (const room of rooms) await Room.updateOne({ roomNumber: room.roomNumber }, { $setOnInsert: room }, { upsert: true });
  console.log('Seed complete. Admin: admin@hotelpro.com / Admin@12345');
  await mongoose.disconnect();
})().catch(e => { console.error(e); process.exit(1); });
