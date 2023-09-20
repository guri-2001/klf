const mongoose = require('mongoose');
import Note from '../../models/Note'


async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).end()
    }

    const {id} = req.query
    const { name, fromCity, toCity, date, loadInfo } = req.body;

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedtopology: true
        }).then(() => console.log("DB connected"));
        // return res.json({ message: "sucessfull" })
    } catch (error) {
        console.log(error);
    }
    try {
        const updateNote = await Note.findByIdAndUpdate(id, { name, fromCity, toCity, date, loadInfo });
        // console.log(updateNote);
        res.status(200).json(updateNote)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "not Updated" })

    }finally {
        mongoose.connection.close();
    }
}

export default handler;