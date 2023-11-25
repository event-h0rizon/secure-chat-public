'use client'
export const dynamic = 'force-dynamic'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import {HiCheckBadge} from 'react-icons/hi'
import { HiCheckBadge } from 'react-icons/hi2'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { BiSolidInfoCircle } from 'react-icons/bi'
import {FiLogOut} from 'react-icons/fi'





const ChatNavbar = ({ targetName, verStatus }) => {
  const router = useRouter()
  const logout = async () => {
    localStorage.removeItem('auth_token')
    router.push('/')
  }
  return (
    <div className="flex items-center w-[100%] max-w-[100vw] min-h-[0px] h-[50px] py-7 bg-black bg-opacity-100 text-white fixed z-10 px-2 justify-between">
      <div className='flex gap-2 items-center'>
        <Link className='text-2xl font-semibold pl-3' href='/my-chats'><IoMdArrowRoundBack /></Link>
        <Link className='text-2xl font-semibold pl-3' href='/my-chats'>{targetName}</Link>
        <div className={verStatus===true ? '' : 'hidden'}>
          <HiCheckBadge className='text-blue-600 text-2xl' />
          {/* <CheckCircleIcon className='text-blue-600' /> */}
        </div>
      </div>
      <div className='text-white items-center flex gap-2 pr-2'>
        <Link className='font-bold hover:bg-opacity-10 text-xl' href='/about'><BiSolidInfoCircle /></Link>
        <Link className='px-1 py-1 font-bold hover:bg-black hover:bg-opacity-10 hover:rounded-full hover:px-1 hover:py-1' href='/search-user'><PersonSearchIcon /></Link>
        {/* <Link className='px-1 py-1 hover:bg-black font-bold hover:bg-opacity-10 hover:rounded-full hover:px-1 hover:py-1' href='/login'><MoreVertIcon /></Link> */}
        <button onClick={logout}><FiLogOut className='text-xl'/></button>
        {/* <ChatIcon /> */}
        {/* <PersonAddIcon/> */}
      </div>
    </div>
  )
}

export default ChatNavbar
