import dbConnect from '@/utils/mongoose';
import setdata from '@/models/setdata';

export default async function handler(req, res) {
  await dbConnect();

  try {
      const { searchName } = req.query;
      const set = await setdata.findOne({ name: searchName });

      if (set) {
          res.status(200).json({ data: set });
      } else {
          res.status(404).json({ error: 'Set not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
}