import React from 'react'
import { bell, logo } from '../../assets'

const NavBar = ({address}) => {
  return (
    <div className='w-full bg-block-color py-4 px-8 inter'>
      <div className='flex justify-between mb-4'>
        <div className='flex items-center gap-4'>
          <img src={logo}/>
          {/* <ul className='flex text-[#CFCFCF]'>
            <li className=''>
              <a className='cursor-pointer hover:text-white px-2 border-r border-[#CFCFCF]'>Home</a>
            </li>
            <li className=''>
              <a className='cursor-pointer hover:text-white px-2 border-r border-[#CFCFCF]'>Account</a>
            </li>
            <li className='px-2'>
              <a className='cursor-pointer hover:text-white'>Settings</a>
            </li>
          </ul> */}
        </div>
        <div className='flex gap-4 items-center'>
        {/* <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input id="default-search" class="block w-full px-4 py-2 pl-10 text-sm text-[#CFCFCF] border border-[#CFCFCF] rounded-lg bg-black/10" placeholder="Search by address..."/>
        </div> */}
          {/* <button className='bg-block-color'>
            <img src={bell}/>
          </button> */}
          <svg height="32" width="40">
              <circle cx="16" cy="16" r="16" fill="red" />
          </svg>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <svg height="56" width="56" className=''>
              <circle cx="28" cy="28" r="28" fill="red" />
          </svg>
          <div className='text-white text-left'>
            <p className='text-2xl font-semibold'>Surveyor Account Address</p>
            <p className='text-sm'>{address}</p>
          </div>
        </div>
        {/* <div className='flex items-center gap-3 text-sm'>
          <span>0 following</span>
          <span>1,230 followers</span>
          <button className='red-btn'>
            + Follow
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default NavBar