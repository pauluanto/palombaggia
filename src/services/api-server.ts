import express from 'express';
import cors from 'cors';
import { roomService, reservationService, userService } from './database';

const app = express();

app.use(cors());
app.use(express.json());

// Rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await roomService.getRooms(req.query);
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/rooms/:id/status', async (req, res) => {
  try {
    await roomService.updateRoomStatus(req.params.id, req.body.status);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reservations
app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await reservationService.getReservations(req.query);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/reservations', async (req, res) => {
  try {
    const id = await reservationService.createReservation(req.body);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/reservations/:id', async (req, res) => {
  try {
    await reservationService.updateReservation(req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Users
app.get('/api/users/me', async (req, res) => {
  try {
    const user = await userService.getCurrentUser();
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});