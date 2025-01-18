import express, { Request, Response } from 'express';
import { Matkul } from '../models/Matkul';
import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();

interface AuthRequest extends Request {
  userId?: string;
}

router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  try {
    const matkuls = await Matkul.find({ userId });
    res.json(matkuls);
  } catch (err) {
    console.error('Error fetching Mata Kuliah:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  const { name, hari, jam, } = req.body;
  const userId = req.userId;

  console.log('Request Body:', req.body);
  console.log('User ID:', userId);

  if (!name || !hari || !jam) {
    res.status(400).json({ error: 'Name and Hari are required' });
    return;
  }

  try {
    const newMatkul = new Matkul({ name, hari, jam, userId });
    console.log('New Matkul to Save:', newMatkul);
    await newMatkul.save();
    res.status(201).json(newMatkul);
  } catch (err) {
    console.error('Error saving Mata Kuliah:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, hari, jam } = req.body;
  const userId = req.userId;

  if (!name || !hari || !jam) {
    res.status(400).json({ error: 'Name and description are required' });
    return;
  }

  try {
    const updatedMatkul = await Matkul.findOneAndUpdate(
      { _id: id, userId },
      { name, hari, jam },
      { new: true }
    );

    if (!updatedMatkul) {
      res.status(404).json({ error: 'Mata Kuliah not found or unauthorized' });
      return;
    }

    res.json(updatedMatkul);
  } catch (err) {
    console.error('Error updating Mata Kuliah:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const matkul = await Matkul.findOneAndDelete({ _id: id, userId });
    if (!matkul) {
      res.status(404).json({ error: 'Mata Kuliah not found or unauthorized' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting Mata Kuliah:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
