import clientPromise from "../../lib/mongo";
import { ObjectId } from "mongodb";

export default async function deletePost (req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("facebook");
        const { id } = req.query;

        const post = await db.collection("userdata").deleteOne({
            _id: new ObjectId(id),
        });

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};