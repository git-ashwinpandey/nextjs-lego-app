import dbConnect from '@/utils/mongoose';
import userdata from '@/models/user';

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Extract query parameter for filtering (if provided)
    const nEmail = req.query.email;

    let findUser = await userdata.findOne({email: nEmail});

    res.status(200).json({ result: findUser });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
