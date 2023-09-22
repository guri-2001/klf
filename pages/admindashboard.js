import React, { useState } from 'react'
import clientPromise from '../lib/mongo';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,

} from '@chakra-ui/react'
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
// import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AdminDashboard = ({ alldata }) => {

    const { data: session } = useSession()
    const router = useRouter()

    const [visibility, setVisibility] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [noteId, setNoteId] = useState('');


    // -----------------Delete User Start ------------------->

    const deleteNote = async (noteId) => {
        axios.delete(`/api/deleteUser?id=${noteId}`).then(() => {
            router.refresh()
        })
    }

    // ------------- Delete User End ----------------->


    // ------------- Edit User Start ----------------->

    const editForm = (name, email, noteId) => {
        setVisibility(visibility => !visibility)
        setName(name)
        setEmail(email)
        setNoteId(noteId)
    }

    const updateNote = async (noteId) => {
        const noteObj = {
            name: name,
            email: email,
        }
        // console.log(noteObj);
        await axios.put(`/api/updateUser?id=${noteId}`, noteObj)
            .then(() => {
                router.refresh();
            })
    }

    // ------------- Edit User End ----------------->

    return (
        <>
            <div style={{ height: "100vh", backgroundColor: "rgb(241 245 249)" }} className="w-full">
                <h1>Welcome {session?.user?.name} </h1>
                <div >
                </div>
                <h1 align="center" style={{ marginBottom: "100px" ,marginBottom:"10px" }}>All Users </h1>
                <div>
                    <Link href={"loadPost"} className="bg-cyan-400 px-3 py-2 ml-5">Add Load</Link>
                    <Link href={"allloads"} className="bg-cyan-400 px-3 py-2 ml-5">All loads</Link>
                </div>
                <TableContainer mx={300} my={100} >
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Verify</Th>
                            </Tr>
                        </Thead>
                        {alldata.map((user) => (
                            <>
                                <Tbody key={user._id}>
                                    <Tr>
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>{user.role}</Td>
                                        <Td>
                                            <div className='flex gap-4 items-start'>

                                                <button onClick={(name, email, password, noteId) => editForm(user.name, user.email, user._id)} className='hover:text-green-600 text-2xl' title='Edit' ><FiEdit /></   button>
                                                <button onClick={() => deleteNote(user._id)} className='hover:text-rose-600 text-2xl' title='Delete'><MdDelete /></button>
                                            </div>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </>
                        ))}
                    </Table>
                </TableContainer>
                {
                    visibility && <div>
                        <h1 className='text-3xl text-center mb-5'>Update Notes</h1>
                        <div className='w-1/2 m-auto bg-gray-700		p-4 text-white rounded-lg'>
                            <div>
                                <label>Name</label>
                                <input type='text' placeholder='Title' id='name' value={name} onChange={(e) => setName(e.target.value)} className='w-full p-2 text-black' />
                            </div>
                            <div>
                                <label>Email</label>
                                <textarea onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Content' id='email' value={email} className='w-full p-2 text-black'></textarea>
                            </div>
                            <div className='flex gap-3 mt-4 '>
                                <button type='submit' onClick={() => updateNote(noteId)} className='bg-green-500 p-1 px-3 rounded-lg text-black'>Update</button>
                                <button onClick={() => setVisibility(visibility => !visibility)} className='bg-rose-500 p-1 px-3 rounded-lg text-black'>Cancel</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );


}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("facebook");

        const alldata = await db
            .collection("users")
            .find({})
            .sort({ role: 1 })
            .toArray();

        return {
            props: { alldata: JSON.parse(JSON.stringify(alldata)) },
        };
    } catch (e) {
        console.error(e);
    }
}


export default AdminDashboard