import clientPromise from "../../lib/mongo";

async function addPost(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("facebook");
        const { name, loadInfo, fromCity, toCity, date } = req.body;

        const posts = await db.collection("userdata").insertOne({
            name,
            fromCity,
            toCity,
            date,
            loadInfo
        },
        {timestamps: true}
        );

        res.json(posts);
    } catch (error) {
        console.log(error);        
    }
};
export default addPost;

