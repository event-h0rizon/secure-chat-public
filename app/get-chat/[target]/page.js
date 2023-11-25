'use client'
import React, { useState, useEffect, useRef } from 'react'
import ChatNavbar from '@/components/ChatNavbar'
import SendIcon from '@mui/icons-material/Send';
import ReplayIcon from '@mui/icons-material/Replay';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollableFeed from 'react-scrollable-feed'
import { useRouter } from 'next/navigation';
import Pusher from 'pusher-js'
import { HiCheckBadge } from 'react-icons/hi'




const ChatPage = ({ params: { target }, searchParams }) => {
    const [verified, setVerified] = useState(false)

    const router = useRouter()

    const [user, setUser] = useState('')
    const [userName, setUserName] = useState('')
    const [targetName, setTargetName] = useState('')
    const [pusherTrigger, setPusherTrigger] = useState(false)

    const [looper, setLooper] = useState(false)


    const myRef = useRef(null)
    const scrollTriggerRef = useRef(null)


    const scrollToBottom = () => {
        myRef.current?.scrollIntoView({ behavior: "smooth" })
    }




    const [newMsg, setNewMsg] = useState('')


    const [myMSGs, setMyMSGs] = useState([])

    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [renderTrigger, setRenderTrigger] = useState(false)
    const [refreshMsgTrigger, setRefreshMsgTrigger] = useState(false)

    const refreshMsg = () => {
        setRefreshMsgTrigger(value => !value)
    }




    const fetchChat = async (auth_token) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_GET_CHAT}/${target}`, {
            method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({
                auth_token: auth_token
            })
        })
        const data = await response.json()
        if (data.myRes.notAUser) {
            toast.error('No user exists with this number', {
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
        }

        if (data.myRes.finalMSGs && data.myRes.finalMSGs.length != 0) {
            setVerified(data.myRes.isVerified)

            const messages = await data.myRes.finalMSGs
            console.log('THIS', data)
            scroller()
            setMyMSGs(messages)
            setUser(data.myRes.user)
            setUserName(data.myRes.userName)
            setTargetName(data.myRes.targetName)
            scroller()


            setTimeout(() => {
            scroller()

                
            }, 1000);



            // setUser(messages[0].sender)
            // setUserName(messages[0].senderName)
            // setTargetName(messages[0].receipientName)

        }
        setVerified(data.myRes.isVerified)

        setUser(data.myRes.user)
        setUserName(data.myRes.userName)
        setTargetName(data.myRes.targetName)
        scrollTriggerRef.current.click()
        myRef.current?.scrollIntoView();
        scroller()




        // setMyMSGs([])

        // setUser('7799392014')
        // setUserName('Karthik')
        // setTargetName('Test')




    }

    const sendMessage = async () => {
        setNewMsg('')
        const getToken = localStorage.getItem('auth_token')


        const response = await fetch(`${process.env.NEXT_PUBLIC_NEW_MSG}`, {
            method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({
                auth_token: getToken,
                sender: user,
                senderName: userName,
                receipient: target,
                receipientName: targetName,
                msgContent: newMsg
            })
        })
        const data = await response.json()
        setRenderTrigger(value => !value)
        if (data.myRes.success) {

            // toast.success('Message sent!', {
            //     transition: Flip,
            //     position: "bottom-center",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "dark",
            // });

        }
        if (data.myRes.failed) {

            toast.error('Message not sent!', {
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

        }
        myRef.current?.scrollIntoView({ behavior: "smooth" });

    }

    const scroller = () => {
        myRef.current?.scrollIntoView({ behavior: "smooth" });


    }





    useEffect(() => {

        const getToken = localStorage.getItem('auth_token')

        if (getToken) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }

    }, [])

    useEffect(() => {
        const getToken = localStorage.getItem('auth_token')
        fetchChat(getToken)
        scrollTriggerRef.current.click()

        // setRenderTrigger(value => !value)

    }, [renderTrigger, pusherTrigger, looper, refreshMsgTrigger])

    const handleChange = (e) => {
        setNewMsg(e.target.value)
    }

    useEffect(() => {
        // if(myRef.current) {
        //     myRef.current?.scrollIntoView();

        // }
        if (scrollTriggerRef) {
            scrollTriggerRef.current.click()
        }
        scrollTriggerRef.current.click()



    }, [])


    useEffect(() => {
        const pusher = new Pusher('6a9b4a71a4a2103bc0d3', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (newMessage) => {
            setPusherTrigger(value => !value)


            // alert(JSON.stringify(newMessage));
            // console.log('MOD THIS', newMessage)
            // console.log('Receipient is', newMessage)
            // console.log('Receipient type is', typeof(newMessage))

            // console.log('Sender is', newMessage)
            // console.log('Sender type is', typeof(newMessage))


            // console.log('User is', user)
            // console.log('User type is', typeof(user))


            // if (newMessage.receipient== user && newMessage.sender!= user) {


            //         if(newMessage.receipient==user && newMessage.sender==target ) {
            //             setMyMSGs([...myMSGs, newMessage])


            //             }




            // }
        });
        //   setPusherTrigger(value=>!value)

        return () => {
            channel.unbind_all()
            channel.unsubscribe()
        }
    }, [])

    useEffect(() => {
      scroll()
    }, [myMSGs])
    




    return (
        <div className='bg-black min-h-screen'>
            <ChatNavbar targetName={targetName} verStatus={verified}/>
            <div className='text-white md:px-[15%] pt-[80px] pb-[100px]'>

                {myMSGs && myMSGs.length != 0 && myMSGs.map((msg, index) => {
                    return (
                        <div key={index} className='break-words'>
                            <p key={index} className={`py-1 md:text-3xl bg-opacity-0 px-2 w-fit text-white text-xl ${msg.receipient !== target ? 'ml-2 rounded-tr-lg rounded-br-lg rounded-bl-lg bg-gradient-to-br from-blue-500 to-blue-500' : 'ml-auto mr-2 rounded-tl-lg rounded-br-lg rounded-bl-lg bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-rose-700 to-rose-700'} max-w-[70%] mb-2`} >{msg.msgContent}<span className='text-xs pl-2'>{msg.msgTime}</span></p>

                        </div>

                    )
                })}






            </div>
            <div className='pb-10 pt-4 md:px-[10%] fixed bottom-0  w-[100%] bg-black text-white'>
                <div className='bg-black flex justify-center items-center  w-[100%] z-30 px-2'>
                    <input autoComplete='new-password' placeholder='Type a message' className='text-black flex-1 max-w-[80%] outline-none px-2 py-1 rounded-lg' type="text" name='newMsg' value={newMsg} onChange={handleChange} />
                    <button onClick={sendMessage} className='px-2' ><SendIcon className='text-4xl' /></button>
                    {/* <button onClick={refreshMsg} className='px-2' ><ReplayIcon className='text-4xl'/></button> */}

                    <button ref={scrollTriggerRef} onClick={scroller} className='' ></button>
                    {/* <button ref={scrollTriggerRef} onClick={scroller} className='border rounded-md border-black px-2' >Go to end</button> */}



                </div>
            </div>

            <div ref={myRef}></div>

        </div>
    )
}

export default ChatPage
