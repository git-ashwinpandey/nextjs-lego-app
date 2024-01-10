import dbConnect from '@/utils/mongoose';
import userdata from '@/models/user';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Extract query parameter for filtering (if provided)
    const nEmail = req.body.email;
    const saltRounds = 10;
    const nPassword = await bcrypt.hash(req.body.password, saltRounds);;

    //let newUser = new userdata({ email: nEmail, password: nPassword });
    let testUser = await userdata.create({ email: nEmail, password: nPassword });
    //const result = await newUser.save();
    const result1 = await testUser.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
