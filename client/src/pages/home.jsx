import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../styles/home.css'
import SideBar from '../components/SideBar/SideBar'
import Tokens from '../components/Tokens'

const Home = () => {
  const [data, setData] = useState([])

  return (
    <div className='bg-[#13131A] text-white h-full'>
      <NavBar/>
      <div className='flex place-content-center my-6'>
        <ul className='flex text-[#CFCFCF]'>
              <li className=''>
                {/* <a className='cursor-pointer hover:text-white px-2 border-r border-[#CFCFCF]'>Portfolio</a> */}
                <p className=' text-white px-2 border-[#CFCFCF]'>Portfolio</p>
              </li>
              {/* <li className=''>
                <a className='cursor-pointer hover:text-white px-2 border-r border-[#CFCFCF]'>NFT's</a>
              </li>
              <li className=''>
                <a className='cursor-pointer hover:text-white px-2 border-r border-[#CFCFCF]'>Transactions</a>
              </li>
              <li className=''>
                 <a className='cursor-pointer hover:text-white px-2'>Time Machine</a>
              </li> */}
          </ul>
      </div>
      <div className='flex mb-4'>
        <SideBar data={data}/>
        <Tokens updateData={setData}/>
      </div>
    </div>
  )
}

export default Home