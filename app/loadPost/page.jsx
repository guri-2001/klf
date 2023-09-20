// "use client"
// import { useToast } from '@chakra-ui/react';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react'

// const LoadPost = () => {
//   const toast = useToast()

//   const router = useRouter();

//   const [name, setName] = useState('');
//   const [loadInfo, setLoadInfo] = useState('');
//   const [fromCity, setFromCity] = useState('');
//   const [toCity, setToCity] = useState('');
//   const [date, setDate] = useState('');
//   const [error, setError] = useState('');

//   // ---------------- HandleSubmit Button Start ------------------>

//   const handleSubmit = async (e) => {
//     e.preventDefault()


//     if (!name || !loadInfo || !fromCity || !toCity || !date) {
//       { `${setError(<div style={{ color: "red" }}>All Fields are required</div>)}` }
//       return;
//     }

//     try {
//       let res = await fetch("/api/addPost", {
//         method: 'POST',
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name,
//           fromCity,
//           toCity,
//           date,
//           loadInfo,
//         })
//       })
//       console.log(res);

//       res = await res.json();
      // toast({
      //   title: 'Added Successfully',
      //   status: 'success',
      //   duration: 9000,
      //   isClosable: true,
      //   position: 'top',
      // })

//       setName("");
//       setLoadInfo("");
//       setFromCity("");
//       setToCity("");
//       setDate("");
//     } catch (error) {
//       console.log(error);
//     }

//   }



//   // ---------------- HandleSubmit Button End ------------------>

//   return (
//     <div>

//       {/* ---------------- Form Start ------------------> */}

//       <div className="container" style={{ width: "50%" }}>
//         <h1>Add Load</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="Name" className="form-label">Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="Name"
//               name="Name"
//               placeholder="Enter your Name"
//               autoComplete='off'
//               value={name}
//               onChange={e => setName(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="From" className="form-label">From</label>
//             <input
//               type="text"
//               className="form-control"
//               id="From"
//               name="From"
//               placeholder="Enter your city"
//               autoComplete='off'
//               value={fromCity}
//               onChange={e => setFromCity(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="To" className="form-label">To</label>
//             <input
//               type="text"
//               className="form-control"
//               id="To"
//               name="To"
//               placeholder="Enter your city"
//               autoComplete='off'
//               value={toCity}
//               onChange={e => setToCity(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="date" className="form-label">Date</label>
//             <input
//               type="date"
//               className="form-control"
//               id="date"
//               name="date"
//               placeholder="Enter your city"
//               autoComplete='off'
//               format="yyyy-mm-dd"
//               value={date}
//               onChange={e => setDate(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="content" className="form-label">Load Info</label>
//             <textarea
//               className="form-control"
//               id="content"
//               name="content"
//               rows="5"
//               placeholder='About Load...'
//               autoComplete='off'
//               value={loadInfo}
//               onChange={e => setLoadInfo(e.target.value)}
//             />
//           </div>
//           {
//             error &&
//             <div style={{ marginBottom: "10px" }}>
//               {error}
//             </div>
//           }
//           <div>
//             <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
//           </div>
//         </form>
//       </div>

//       {/* ---------------- Header End ------------------> */}

//     </div>
//   )
// }

// export default LoadPost

"use client"

import axios from 'axios'
import React, { useState } from 'react'
import Link from 'next/link'
import { Input, Textarea, useToast } from '@chakra-ui/react'

const LoadPost = () => {

  const toast = useToast()

  const [name, setName] = useState('')
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [date, setDate] = useState('')
  const [loadInfo, setLoadInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    const newObj = {
      name: name,
      fromCity: fromCity,
      toCity: toCity,
      date: date,
      loadInfo: loadInfo,
    }

    console.log(newObj);
    const res = axios.post('/api/newNote', newObj)
      .then(() => {
        // alert('New note Added successfully')
      
      })

      toast({
        title: 'Added Successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })


    setName("")
    setFromCity("")
    setToCity("")
    setDate("")
    setLoadInfo("")

  }

  return (
    <div>
      {/* <Link href={"loadPost"} className="bg-cyan-400 px-3 py-2 ml-5">Add Load</Link> */}
      <Link href={"allloads"} className="bg-cyan-400 px-3 py-2 ml-5">All loads</Link>
      <div className='flex w-1/2 m-auto p-5 justify-between   mt-5'>
        <form className='w-full flex flex-col  gap-4  py-3 px-4 rounded-xl' onSubmit={handleSubmit}>
          <div>
            <label className='text-2xl'>Name</label>
            <Input placeholder='Name' size='lg' onChange={e => setName(e.target.value)} value={name} />
            {/* <input type="text" onChange={e => setName(e.target.value)} value={name} placeholder='Name' className='w-full p-2 border border-black  focus:shadow-lg outline-0' style={{ borderRadius: "5px" }} /> */}
          </div>
          <div>
            <label className='text-2xl'>fromCity</label>
          <Input placeholder='From City' size='lg' onChange={e => setFromCity(e.target.value)} value={fromCity} />
            {/* <input type="text" onChange={e => setFromCity(e.target.value)} value={fromCity} placeholder='FromCity' className='w-full p-2 border border-black  focus:shadow-lg outline-0' style={{ borderRadius: "5px" }} /> */}
          </div>
          <div>
            <label className='text-2xl'>toCity</label>
            <Input placeholder='To City' size='lg' onChange={e => setToCity(e.target.value)} value={toCity}/>
            {/* <input type="text" onChange={e => setToCity(e.target.value)} value={toCity} placeholder='ToCity' className='w-full p-2 border border-black  focus:shadow-lg outline-0' style={{ borderRadius: "5px" }} /> */}
          </div>
          <div>
            <label className='text-2xl'>Date</label>
            <Input type='date' size='lg' onChange={e => setDate(e.target.value)} value={date} />
            {/* <input type="date" onChange={e => setDate(e.target.value)} value={date} className='w-full p-2 border border-black  focus:shadow-lg outline-0' style={{ borderRadius: "5px" }} /> */}
          </div>
          <div>
            <label className='text-2xl'>LoadInfo</label>
            <Textarea placeholder='Load Details...' size='lg' onChange={e => setLoadInfo(e.target.value)} value={loadInfo}/>
            {/* <textarea type="text" onChange={e => setLoadInfo(e.target.value)} value={loadInfo} placeholder='About Load...' className='w-full p-2 border border-black  focus:shadow-lg outline-0' style={{ borderRadius: "5px" }}  ></textarea> */}
          </div>
          <div>
            <button type='submit' className='w-full text-xl bg-green-400 px-3 py-2 mt-3 rounded-lg'  >Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoadPost