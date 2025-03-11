import express from 'express';
import { syncUserWithClerk } from '../services/useService';
const router = express.Router();
import cors from 'cors';
router.use(cors());
router.post('/sync', async (req, res) => {
  try {
    const userData = req.body;
    const user = await syncUserWithClerk(userData);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ success: false, error: 'Failed to sync user' });
  }
});

export default router;