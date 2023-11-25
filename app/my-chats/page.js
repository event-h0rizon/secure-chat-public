'use client'
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {HiCheckBadge} from 'react-icons/hi2'


const Chats = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [myFriend, setMyFriend] = useState([])

  // const [myFriendName, setMyFriendName] = useState([])

  const [renderTrigger, setRenderTrigger] = useState(false)




  useEffect(() => {

    const getToken = localStorage.getItem('auth_token')

    if (getToken) {
      setIsLoggedIn(true)
    }
    else {
      setIsLoggedIn(false)
    }

  }, [])

  const fetchChats = async (auth_token) => {
    const response = await fetch(process.env.NEXT_PUBLIC_GET_CHATS, {
      method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        auth_token: auth_token
      })
    })
    const data = await response.json()
    const friends = await data.myRes.friends
    // const friendNames = await data.myRes.allFriendNames



    console.log('CHATS', friends)
    setMyFriend(friends)
    // setMyFriendName(friendNames)


  }

  useEffect(() => {
    const getToken = localStorage.getItem('auth_token')
    fetchChats(getToken)
    setRenderTrigger(value => !value)

  }, [])

  useEffect(() => {


  }, [renderTrigger])



  return (
    <div className='bg-black min-h-screen'>
      <Navbar />
      <div className='text-white pt-[80px] py-[40px] md:px-[15%]'>
        {myFriend && myFriend.length != 0 && myFriend.map((chat, index) => {
          return (
            <Link href={`/get-chat/${chat.friendNUM}`} key={index} className='flex gap-4 mb-2 items-center pl-2 bg-white bg-opacity-5 py-2 hover:bg-opacity-40 hover:cursor-pointer rounded-lg'>
              <img src="/userthumb.png" className='rounded-full ml-4' width='50px' height='50px' alt="" /> 
              <p className='text-xl'>{chat.friendNAMES}</p>
              <div className={chat.isVerifiedArray=== true ? '' : 'hidden'}>
                <HiCheckBadge className='text-blue-600 text-2xl' />
              </div>
            </Link>)
        })}
      </div>
    </div>
  )
}

export default Chats
