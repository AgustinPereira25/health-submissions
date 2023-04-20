import React, { useContext } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import LogInfo from './LogInfo';
import { AuthContext } from '@/context/auth';



export const Sidebar = () => {
  const router = useRouter();
  // console.log(router)
  const { user } = useContext(AuthContext);
  
  const basicClassnames:string = 'py-2 pl-2 flex flex-row items-center justify-start hover:bg-gray-900 '
  
  return (
    // si no se agrega shrink-0 se achica la navbar..
    // <div className='shrink-0 relative px-3 py-4 w-[calc(100vh-380px)] bg-gray-800 h-screen'>
    <div className='shrink-0 relative px-3 py-4 w-[calc(100vh-380px)] bg-gray-800'>
        {
          user?.role === 'doctor' 
          ?
          (
            <>
              <Link href={'/doctor/submissions'} className={ router.asPath === '/doctor/submissions' ? basicClassnames + 'bg-gray-900 ' : basicClassnames } >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-house-door" viewBox="0 0 16 16">
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                </svg>
                <button className="active:bg-gray-900 pl-3 text-white font-normal text-base">Home</button>
              </Link>

              <Link href={'/doctor/history'} className= { router.asPath === '/doctor/history' ? basicClassnames + 'bg-gray-900' : basicClassnames } >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-card-list" viewBox="0 0 16 16">
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                  <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                </svg>
                <p className="pl-3 text-white font-normal text-base">Task History</p>
              </Link>
            </>
          ) : ( // It's a patient role.
            <>
              <Link href={'/patient'} className= { router.asPath === '/patient' ? basicClassnames + 'bg-gray-900 ' : basicClassnames } >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-house-door" viewBox="0 0 16 16">
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                </svg>
                <button className="active:bg-gray-900 pl-3 text-white font-normal text-base">Home</button>
              </Link>

              <Link href={'/patient/submissions/new'} className= { router.asPath === '/patient/submissions/new' ? basicClassnames + 'bg-gray-900 ' : basicClassnames } >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-plus-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <p className="pl-3 text-white font-normal text-base">New submission</p>
              </Link>
            </>
          )
        }
        

        <div className="p-2 absolute h-[80px] bottom-0 left-0 w-full pb-2 bg-gray-700">
            <LogInfo />
        </div>
    </div>
  )
}

export default Sidebar;
