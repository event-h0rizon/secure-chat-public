'use client'
export const dynamic = 'force-dynamic'

import React, { useState, useEffect, useContext } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


const SignUp = () => {
  const router= useRouter()

  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setcPassword] = useState('')
  const [isPwdVisible, setIsPwdVisible] = useState(false)
  const [disableButton, setDisableButton] = useState(true)

  const [pwdWarning, setPwdWarning] = useState(false)



  useEffect(() => {
    if (password.length == 0 || cPassword.length == 0 || name.length == 0  || mobile.length == 0) {

        setDisableButton(true)
        setPwdWarning(false)

    }
    else {
        if (password === cPassword) {
            setDisableButton(false)
            setPwdWarning(false)
        }
        else {
            setDisableButton(true)
            setPwdWarning(true)

        }
    }

}, [password, cPassword, name, mobile])


  const togglePwdVisibility = () => {
    setIsPwdVisible(prev => !prev)
  }



  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value)
    }
    if (e.target.name === 'mobile') {
      setMobile(e.target.value)
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
    if (e.target.name === 'cPassword') {
      setcPassword(e.target.value)
    }
  }

  const signup = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_SIGNUP, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
            name,
            password,
            mobile
        })
    })
    const data = await response.json()
    console.log(data)
    if (data.auth_token) {
        localStorage.setItem('auth_token', data.auth_token);
        toast.success(`Sign up success`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        router.push('/my-chats')
        // setRefreshLoginStatus(value => !value)
    }
   
    if (data.dbUserMobileExists) {
        // alert('Mobile already Registerted')
        toast.error('Mobile number already registered', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        // setRefreshLoginStatus(value => !value)


    }

}


  return (
    <div className='bg-black h-screen'>
      <h1 className='text-white font-semibold text-4xl px-1 py-2'>Chat anywhere, anytime securely for free! Sign up, NOW!
      </h1>
      <div className='flex flex-col items-center h-[400px] justify-center gap-8'>

      <div className='flex space-x-2 justify-between items-center w-[80%] md:w-[30%]'>
          <div className="relative w-[100%]">
            <input autoComplete='new-password' type='text' id="name" name="name" value={name} onChange={handleChange} className="px-1 rounded-lg peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Name" />
            <label htmlFor="name" className="px-2 absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-white peer-focus:text-sm">Name</label>
          </div>
        </div>

        <div className='flex space-x-2 justify-between items-center w-[80%] md:w-[30%]'>
          <div className="relative w-[100%]">
            <input autoComplete='new-password' type='number' id="mobile" name="mobile" value={mobile} onChange={handleChange} className="px-1 rounded-lg peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Mobile" />
            <label htmlFor="mobile" className="px-2 absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-white peer-focus:text-sm">Mobile</label>
          </div>
        </div>

        <div className='flex space-x-2 justify-between items-center w-[80%] md:w-[30%]'>
          <div className="relative w-[100%]">
            <input autoComplete='new-password' id="password" name="password" value={password} type={`${isPwdVisible ? 'text' : 'password'}`} onChange={handleChange} className="px-1 rounded-lg peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
            <label htmlFor="password" className="px-2 absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-white peer-focus:text-sm">Password</label>
          </div>
          {isPwdVisible ? <AiFillEyeInvisible onClick={togglePwdVisibility} className='text-3xl text-white' /> : <AiFillEye onClick={togglePwdVisibility} className='text-3xl text-white' />}
        </div>

        <div className='flex space-x-2 justify-between items-center w-[80%] md:w-[30%]'>
          <div className="relative w-[100%]">
            <input autoComplete='new-password' id="cPassword" name="cPassword" value={cPassword} type={`${isPwdVisible ? 'text' : 'password'}`} onChange={handleChange} className="px-1 rounded-lg peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Confirm Password" />
            <label htmlFor="cPassword" className="px-2 absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-white peer-focus:text-sm">Confirm Password</label>
          </div>
        </div>
        <div className={`${pwdWarning ? 'block' : 'hidden'} text-sm pb-2 text-red-600`}>Passwords don't match.</div>

        <div className="relative text-center">
          <button onClick={signup} disabled={disableButton}  className="bg-purple-700 text-white rounded-md px-3 py-1 disabled:bg-black disabled:border-white disabled:border-2">Sign Up</button>
        </div>

      </div>
    </div>
  )
}

export default SignUp
