'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const router= useRouter()

  useEffect(() => {
    const getToken= localStorage.getItem('auth_token')
    if(getToken) {

      router.push('/my-chats')

    }

  }, [])


  return (
    <div className='bg-black'>
      <div className='flex flex-col justify-center items-center h-screen'>
        <img className='rounded-xl w-[220px] h-[220px] bg-contain' src="/splash.jpg" alt="" />
        <div className='mt-4 flex gap-4'>
          <Link href='/login'>
            <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Login</button>
          </Link>

          <Link href='/signup'>
            <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Sign Up</button>
          </Link>


        </div>

      </div>
    </div>
  )
}
