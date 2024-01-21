import dbConnect from '@/utils/mongoose';
import themedata from '@/models/theme';

export default async function handler(req, res) {
    await dbConnect();

    try {
        const themes = await themedata.find({}, { _id: 0 });
        res.status(200).json(themes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
