import { Inter } from 'next/font/google'
import './globals.css'
import ChatProvider from '../providers/ChatProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Secure Chat',
  description: 'Secure and real time chatting App.',
}

export const viewport= {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 0,
  themeColor: '#000000'

}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChatProvider>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {children}
        </ChatProvider>

      </body>
    </html>
  )
}
