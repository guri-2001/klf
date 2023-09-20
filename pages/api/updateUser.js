import { connectMongoDB } from '../../lib/mongodb';
import User from '../../models/user';

async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).end()
    }
    
    try {
        const {id} = req.query
        const { name, email, role } = req.body;
        await connectMongoDB();
        const updateNote = await User.findByIdAndUpdate(id, { name, email, role });
        // console.log(updateNote);
        res.status(200).json(updateNote)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "not Updated" })
    }
}

export default handler;