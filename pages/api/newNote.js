import mongoose from "mongoose";
import Note from '../../models/Note'


async function handler(req, res) {
    if (req.method != "POST") {
        return res.status(405).end()
    }

    try {
        const { name, fromCity, toCity, date, loadInfo } = req.body;
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
        }).then(() => console.log("DB connected"));
        let newNote = new Note({ name, fromCity, toCity, date, loadInfo });
        await newNote.save();
        // console.log(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error"});
    }finally{
        mongoose.connection.close();
    }
}

export default handler;