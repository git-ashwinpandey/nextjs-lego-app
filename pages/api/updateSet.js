import dbConnect from '@/utils/mongoose';
import setdata from '@/models/setdata';

export default async function handler(req, res) {
    await dbConnect();

    try {
        const { searchID } = req.query;
        const updatedData = req.body;
        const result = await setdata.updateOne({ _id: searchID }, { $set: updatedData });

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Set updated successfully' });
        } else {
            res.status(404).json({ error: 'Set not found or not updated' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
