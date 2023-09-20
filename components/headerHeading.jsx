import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'


const LinkHeading = () => {

  const { data: session } = useSession()

  if(session) {
    return (
      <div>
        <Link href={'/admindashboard'}>ADMIN</Link>
      </div>
    )
  }
  else{
    return (
      <div>
        <Link href={'/admin'}>ADMIN</Link>
      </div>
    )
  }
  
}

export default LinkHeading