import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../styles/home.css'
import SideBar from '../components/SideBar/SideBar'
import Tokens from '../components/Tokens/Tokens'
import LP from '../components/LP/LP'

const Home = () => {
  const [data, setData] = useState([])
  const USER_ADDR = '0xebb8ee4722501358bf70559d26ef6e7b1326b3c6'

  return (
    <div className='bg-[#13131A] text-white h-full'>
      <NavBar address={USER_ADDR}/>
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
        <Tokens updateData={setData} address={USER_ADDR}/>
      </div>
      <div>
        <LP address={USER_ADDR}/>
      </div>
    </div>
  )
}

export default Home