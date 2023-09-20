import { connectMongoDB } from '../../lib/mongodb';
// import Note from '../../../models/Note'
import User from '../../models/user';


async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).end()
    }
    
    try {
        const { id } = req.query
        await connectMongoDB();
        const deleteNote = await User.deleteOne({ _id:id })
        return res.status(200).end()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Note deleted"})
    }
}

export default handler;