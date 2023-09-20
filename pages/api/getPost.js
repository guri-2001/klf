import clientPromise from "../../lib/mongo";

export default async function getPost (req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("facebook");

        const movies = await db
            .collection("userdata")
            .find({})
            .sort({ _id: 1 })
            .limit(10)
            .toArray();

        res.json(movies);
    } catch (e) {
        console.error(e);
    }
};
