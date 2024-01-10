import dbConnect from '@/utils/mongoose';
import setdata from '@/models/setdata';

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Extract query parameter for filtering (if provided)
    const { deleteKey } = req.query;

    let sets = await setdata.deleteOne(deleteKey); // Get sets from the collection based on the query
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
