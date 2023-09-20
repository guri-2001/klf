const mongoose = require('mongoose');
import Note from '../../models/Note'


async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).end()
    }

    const { id } = req.query

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedtopology: true
        }).then(() => console.log("DB connected"));
    } catch (error) {
        console.log(error);
    }

    try {
        const deleteNote = await Note.deleteOne({ _id:id })
        return res.status(200).end()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Note deleted"})
    }finally{
        mongoose.connection.close()
    }
}

export default handler;