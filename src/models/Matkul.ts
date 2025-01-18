import mongoose from 'mongoose';

const matkulSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hari: {
    type: String,
    required: true,
  },
  jam: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export const Matkul = mongoose.model('Matkul', matkulSchema);
