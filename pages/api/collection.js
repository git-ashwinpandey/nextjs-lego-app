import dbConnect from '@/utils/mongoose';
import setdata from '@/models/setdata';

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Extract query parameter for filtering (if provided)
    const { searchTerm } = req.query;
    
    let query = {};
    if (searchTerm) {
      // Modify this query to match the fields you want to filter by
      query = { $or: [{ 'name': new RegExp(searchTerm, 'i') }, { 'theme.name': new RegExp(searchTerm, 'i') }] };
    }

    let sets = await setdata.find(query); // Get sets from the collection based on the query
    res.status(200).json({ data: sets });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
