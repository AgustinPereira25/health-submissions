import { AuthContext } from '@/context/auth';
import React, { useContext } from 'react'

export const LogInfo = () => {

  const { user, logout } = useContext(AuthContext);
  // console.log({ user });
  return (
    // <div className='flex h-full items-center'>
    <div className='flex items-center'>
      <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="18" fill="#9CA3AF"/>
        <path d="M13.6165 14.1406V12.8182H21.4964V14.1406H18.3196V23H16.7884V14.1406H13.6165Z" fill="white"/>
      </svg>
      <div className="align-top h-full pt-3 pl-4">
        <p className="text-sm text-white">{ user?.name }</p>
        <button onClick={ logout } className="text-xs text-slate-400 hover:text-slate-500 cursor-pointer">Sign out</button>
      </div>
    </div>
  )
}

export default LogInfo;