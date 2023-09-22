import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import Link from 'next/link';
import clientPromise from '../lib/mongo';


// export async function getStaticProps() {
//     const mongoose = require('mongoose');
//     const Note = require('../models/Note');

//     await mongoose.connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true,
//     }).then(() => { console.log("DB connected") });

//     const notes = await Note.find();
//     console.log(notes);

//     return {
//         props: {
//             notes: JSON.parse(JSON.stringify(notes))
//         }
//     }
// }

export default function Home({ notes }) {

    const [visibility, setVisibility] = useState(false);
    const [name, setName] = useState('');
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [date, setDate] = useState('');
    const [loadInfo, setLoadInfo] = useState('');
    const [noteId, setNoteId] = useState('');

    const router = useRouter()


    const editForm = (name, fromCity, toCity, date, loadInfo, noteId) => {
        setVisibility(visibility => !visibility)
        setName(name)
        setFromCity(fromCity)
        setToCity(toCity)
        setDate(date)
        setLoadInfo(loadInfo)
        setNoteId(noteId)
    }

    const updateNote = async (noteId) => {
        const noteObj = {
            name: name,
            fromCity: fromCity,
            toCity: toCity,
            date: date,
            loadInfo: loadInfo,
        }
        console.log(noteObj);
        await axios.put(`/api/updateNote?id=${noteId}`, noteObj)
            .then(() => {
                window.location.reload(false);
            })
    }

    const deleteNote = async (noteId) => {
        axios.delete(`/api/deleteNote?id=${noteId}`).then(() => {
            router.refresh()
        })
    }

    return (
        <>
        <Link href={'loadPost'}className="bg-cyan-400 px-3 py-2 ml-5">Add Load</Link>
            <div className='mt-5'>
                <div >
                    <ul >
                        {
                            notes.map((note) => {
                                return (
                                    <>
                                        <div key={note._id} className='flex  w-1/2 m-auto bg-slate-50	 hover:shadow-xl transition-all py-2 px-3 rounded-sm justify-between text-2xl mt-10 mb-5'>
                                            <div className='flex flex-col gap-3'>
                                                <h2 className='text-3xl'>{note.name}</h2>
                                                <p className='text-base'>
                                                    {note.date}<br />
                                                    {note.loadInfo}
                                                </p>
                                            </div>
                                            <div className='flex gap-4 mt-5 items-start'>
                                            <Link href={'loadDetail'} className="bg-cyan-500 px-3 py-1 text-white text-lg" >View Detail</Link>
                                                <button onClick={(name, fromCity, loadInfo, noteId) => editForm(note.name, note.fromCity, note.toCity, note.date, note.loadInfo, note._id)} className='hover:text-green-600' title='Edit' ><FiEdit /></   button>
                                                <button onClick={() => deleteNote(note._id)} className='hover:text-rose-600' title='Delete'><MdDelete /></button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                        {
                            visibility && <div>
                                <h1 className='text-3xl text-center mb-5'>Update Notes</h1>
                                <div className='w-1/2 m-auto bg-gray-700		p-4 text-white rounded-lg'>
                                    <div>
                                        <label>Name</label>
                                        <input type='text' placeholder='Title' id='title' value={name} onChange={(e) => setName(e.target.value)} className='w-full p-2 text-black' />
                                    </div>
                                    <div>
                                        <label>Content</label>
                                        <input onChange={(e) => setFromCity(e.target.value)} type='text' placeholder='Content' id='content' value={fromCity} className='w-full p-2 text-black' />
                                    </div>
                                    <div>
                                        <label>ToCity</label>
                                        <input onChange={(e) => setToCity(e.target.value)} type='text' placeholder='Content' id='content' value={toCity} className='w-full p-2 text-black' />
                                    </div>
                                    <div>
                                        <label>date</label>
                                        <input onChange={(e) => setDate(e.target.value)} type='date' placeholder='Content' id='content' value={date} className='w-full p-2 text-black' />
                                    </div>
                                    <div>
                                        <label>LoadInfo</label>
                                        <textarea onChange={(e) => setLoadInfo(e.target.value)} type='text' placeholder='Content' id='content' value={loadInfo} className='w-full p-2 text-black'></textarea>
                                    </div>
                                    <div className='flex gap-3 mt-4 '>
                                        <button type='submit' onClick={() => updateNote(noteId)} className='bg-green-500 p-1 px-3 rounded-lg text-black'>Update</button>
                                        <button onClick={() => setVisibility(visibility => !visibility)} className='bg-rose-500 p-1 px-3 rounded-lg text-black'>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}



export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("facebook");

        const notes = await db
            .collection("notes")
            .find({})
            .sort({ _id: -1 })
            .toArray();

        return {
            props: { notes: JSON.parse(JSON.stringify(notes)) },
        };
    } catch (e) {
        console.error(e);
    }
}