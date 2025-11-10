const { v4: uuidv4 } = require('uuid');

// In-memory storage for demo purposes
const reservations = [];

// Helper to parse date
function parseDate(v) {
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

exports.createReservation = (req, res) => {
  const { hotel, guest, roomType, checkIn, checkOut, price, status } = req.body;
  if (!hotel || !guest || !checkIn || !checkOut) {
    return res.status(400).json({ message: 'hotel, guest, checkIn and checkOut are required' });
  }
  const id = uuidv4();
  const reservation = { id, hotel, guest, roomType: roomType || 'standard', checkIn, checkOut, price: price || 0, status: status || 'booked' };
  reservations.push(reservation);
  res.status(201).json(reservation);
};

exports.getAllReservations = (req, res) => {
  res.json(reservations);
};

exports.getReservationById = (req, res) => {
  const r = reservations.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ message: 'Reservation not found' });
  res.json(r);
};

exports.updateReservation = (req, res) => {
  const idx = reservations.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Reservation not found' });
  const existing = reservations[idx];
  const updated = { ...existing, ...req.body };
  reservations[idx] = updated;
  res.json(updated);
};

exports.deleteReservation = (req, res) => {
  const idx = reservations.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Reservation not found' });
  reservations.splice(idx, 1);
  res.status(204).send();
};

// Filters
exports.getByHotel = (req, res) => {
  const hotel = req.params.hotel.toLowerCase();
  res.json(reservations.filter(r => r.hotel && r.hotel.toLowerCase() === hotel));
};

exports.getByGuest = (req, res) => {
  const guest = req.params.guest.toLowerCase();
  res.json(reservations.filter(r => r.guest && r.guest.toLowerCase().includes(guest)));
};

exports.getByDateRange = (req, res) => {
  const from = parseDate(req.query.from);
  const to = parseDate(req.query.to);
  if (!from || !to) return res.status(400).json({ message: 'Invalid from or to date' });
  const results = reservations.filter(r => {
    const ci = parseDate(r.checkIn);
    const co = parseDate(r.checkOut);
    return ci && co && ci >= from && co <= to;
  });
  res.json(results);
};

exports.getByStatus = (req, res) => {
  const status = req.params.status.toLowerCase();
  res.json(reservations.filter(r => (r.status || '').toLowerCase() === status));
};

exports.getByRoomType = (req, res) => {
  const rt = req.params.roomType.toLowerCase();
  res.json(reservations.filter(r => (r.roomType || '').toLowerCase() === rt));
};

exports.getByPriceRange = (req, res) => {
  const min = parseFloat(req.query.min || '0');
  const max = parseFloat(req.query.max || 'Infinity');
  if (isNaN(min) || isNaN(max)) return res.status(400).json({ message: 'Invalid min or max' });
  res.json(reservations.filter(r => r.price >= min && r.price <= max));
};

// Combined search via query params: hotel, guest, from, to, status, roomType, minPrice, maxPrice
exports.searchReservations = (req, res) => {
  const q = req.query;
  let results = reservations.slice();
  if (q.hotel) results = results.filter(r => r.hotel && r.hotel.toLowerCase().includes(q.hotel.toLowerCase()));
  if (q.guest) results = results.filter(r => r.guest && r.guest.toLowerCase().includes(q.guest.toLowerCase()));
  if (q.status) results = results.filter(r => (r.status || '').toLowerCase() === q.status.toLowerCase());
  if (q.roomType) results = results.filter(r => (r.roomType || '').toLowerCase() === q.roomType.toLowerCase());
  if (q.from && q.to) {
    const from = parseDate(q.from); const to = parseDate(q.to);
    if (from && to) results = results.filter(r => {
      const ci = parseDate(r.checkIn); const co = parseDate(r.checkOut);
      return ci && co && ci >= from && co <= to;
    });
  }
  if (q.minPrice || q.maxPrice) {
    const min = parseFloat(q.minPrice || '0');
    const max = parseFloat(q.maxPrice || String(Number.POSITIVE_INFINITY));
    results = results.filter(r => r.price >= min && r.price <= max);
  }
  res.json(results);
};
