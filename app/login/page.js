'use client'
export const dynamic = 'force-dynamic'


import React, { useState, useEffect, useContext } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


const Login = () => {
  const router= useRouter()

  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')

  const [disableButton, setDisableButton] = useState(true)
  const [isPwdVisible, setIsPwdVisible] = useState(false)


  useEffect(() => {
    if (password.length == 0 || mobile.length == 0 ) {

        setDisableButton(true)
        // setPwdWarning(false)

    }
    else {
       setDisableButton(false)
    }

}, [password, mobile])




  const handleChange = (e) => {
    if (e.target.name === 'mobile') {
        setMobile(e.target.value)
    }
   
    if (e.target.name === 'password') {
        setPassword(e.target.value)
    }
}

const togglePwdVisibility = () => {
  setIsPwdVisible(prev => !prev)
}

const login = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_LOGIN, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          mobile,
          password
      })
  })
  const data = await response.json()
  console.log(data)
  if (data.myRes && data.myRes.auth_token) {
      localStorage.setItem('auth_token', data.myRes.auth_token);
      toast.success(`Welcome, ${data.myRes.firstName}`, {
          transition: Flip,
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
    
      router.push('/my-chats')
      // setRefreshLoginStatus(value=>!value)
  }
  if (data.errorPWD) {
      // alert('Email already Registerted')
      toast.error('Incorrect Password', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
      // setRefreshLoginStatus(value=>!value)

  }
  if (data.errorUSER) {
      // alert('Mobile already Registerted')
      toast.error('Mobile is not registered', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
      // setRefreshLoginStatus(value=>!value)


  }
 

}



  return (
    <div className='bg-black h-screen'>
      <h1 className='text-white font-semibold text-4xl px-1 py-2'>Chat anywhere, anytime securely for free! Login to start chatting !
      </h1>
      <div className='flex flex-col items-center h-[400px] justify-center gap-8'>

        <div className='flex space-x-2 justify-between items-center w-[80%] md:w-[30%]'>
          <div className="relative w-[100%]">
            <input type='number' autoComplete='new-password' id="mobile" name="mobile" value={mobile} onChange={handleChange} className="px-1 rounded-lg peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Mobile" />
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
        <div className="relative text-center">
          <button onClick={login} disabled={disableButton} className="bg-purple-700 text-white rounded-md px-3 py-1 disabled:bg-black disabled:border-white disabled:border-2">Login</button>
        </div>

      </div>
    </div>
  )
}

export default Login
