import { useAuth } from '@/context/AuthContext'
import { User } from 'lucide-react'
import React from 'react'

const ProfileCard = () => {
    const {user} = useAuth()
  return (
    <div className='w-full max-w-2xl bg-dubraPrimary flex rounded-xl gap-5'>
        <div className='w-1/4'>
            <User className='w-full h-full'/>
        </div>
        <div className='h-full flex flex-col justify-center text-3xl'>
            <p>{user && user.email}</p> {/* todo: name */}
            <p className='text-4xl'>{user && user.email}</p>
        </div>
    </div>
  )
}

export default ProfileCard