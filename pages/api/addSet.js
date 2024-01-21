import dbConnect from '@/utils/mongoose';
import setdata from '@/models/setdata';

export default async function handler(req, res) {
    await dbConnect();

    try {
        const newSet = req.body;
        console.log("add set api now");
        console.log(newSet);
        let currentSet = await setdata.create(newSet);
        console.log(currentSet);
        res.status(200).json({ message: 'Set added successfully' });
    } catch (error) {
        console.error('Error adding new set:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
