import dbConnect from '@/utils/mongoose';
import userdata from '@/models/user';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const nEmail = req.body.email;
    const nPassword = req.body.password;
    let compareResult = false;
    const userAccount = await userdata.findOne({ email: nEmail });

    if (userAccount) {
      compareResult = await bcrypt.compare(nPassword, userAccount.password); 
    } else {
      console.log("Unable to find user");
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (compareResult) {
      res.status(200).json({ success: true, message: 'Authentication successful' });
    } else {
      res.status(401).json({ success: false, message: 'Authentication failed' });
    }

  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
