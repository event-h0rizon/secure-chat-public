'use client'
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IoSearchSharp } from "react-icons/io5"
import { HiCheckBadge } from 'react-icons/hi2'


const SearchUser = () => {

    const [mobile, setMobile] = useState('')
    const [token, setToken] = useState('')
    const [user, setUser] = useState('')
    const [noUser, setNoUser] = useState('')



    // let token=''

    const handleChange = (e) => {
        setMobile(e.target.value)
    }

    const search = async () => {
        setUser('')
        setNoUser('')
        const response = await fetch(process.env.NEXT_PUBLIC_SEARCH_USER, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                auth_token: token,
                mobile: mobile
            })
        })
        const data = await response.json()
        if (data.myRes.fetchedUser) {
            // console.log('333333333333333333333333333333333333333333333333333333333333',data.myRes.fetchedUser)
            setUser(data.myRes.fetchedUser)
        }
        if (data.myRes.noUser) {
            setNoUser(data.myRes.noUser)
        }

        console.log(data.myRes.fetchedUser)
        // console.log('ok',data)
        // console.log('ok',user)

    }

    useEffect(() => {
        const getToken = localStorage.getItem('auth_token')
        // fetchChats(getToken)
        // setRenderTrigger(value => !value)
        setToken(getToken)

    }, [])

    //   console.log('THISISISIISIISISIS', token)
    return (
        <div className='bg-black min-h-screen'>
            <Navbar />
            <div className='pt-[50px] flex gap-2 justify-center items-center h-[350px]'>
                <input id='mobile' className='px-2 rounded-lg outline-none py-2 w-[300px]' type='number' value={mobile} onChange={handleChange} placeholder="Enter mobile number" />
                <IoSearchSharp onClick={search} className='text-white text-3xl font-bold hover:bg-white hover:bg-opacity-25 hover:rounded-md' />
            </div>

            {user && <div className='md:px-[15%]'>
                <Link href={`/get-chat/${user.mobile}`} className='flex gap-4 items-center pl-6  py-2 hover:bg-opacity-70 hover:cursor-pointer rounded-lg bg-white bg-opacity-100'>
                    <img src="/userthumb.png" className='rounded-full' width='50px' height='50px' alt="" />
                    <p className='text-xl'>{user.name}</p>
                    <div className={user.isVerified===true ? '' : 'hidden'}>
                    <HiCheckBadge className='text-blue-600 text-2xl' />
                    </div>

                </Link>
            </div>}

            {noUser && <div className='md:px-[15%]'>
                <div className='flex gap-4 items-center pl-6  py-2 hover:bg-opacity-70 hover:cursor-pointer rounded-lg bg-white bg-opacity-100'>
                    <img src="/userthumb.png" className='rounded-full' width='50px' height='50px' alt="" />
                    <p className='text-xl'>No user found</p>
                </div>

            </div>}


        </div>
    )
}

export default SearchUser
