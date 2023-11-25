'use client'
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IoSearchSharp } from "react-icons/io5"
import { HiCheckBadge } from 'react-icons/hi2'


const About = () => {

    return (
        <div className='bg-black min-h-screen'>
            <Navbar />
            <div className='md:px-[15%] px-3 text-white pt-[80px]'>
                <div className='text-3xl font-semibold'>About SecureChat
                </div>
                <div className='pt-5'>
                    SecureChat is a free and secure real time chatting WebApp built by <span className='text-green-600 font-bold px-1'>Karthik. P</span> 
                </div>
                <div className='pt-4'>
                    Contact Karthik by clicking <Link href='/get-chat/7799392014' className='text-green-600 font-bold px-1'>here</Link>
                </div>
                <div className='pt-4'>
                    Email: karthikp0231@gmail.com
                </div>
            </div>

        </div>
    )
}

export default About
