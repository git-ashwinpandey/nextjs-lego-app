import dbConnect from '@/utils/mongoose';
import setdata from '@/models/setdata';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const { deleteKey } = req.body; // Correctly extract deleteKey

    const result = await setdata.deleteOne({ _id: deleteKey });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Set not found' });
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
