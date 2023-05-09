import React, { useEffect, useState } from 'react'
import './SideBar.css'
import { data } from '../../data/assets'

const SideBar = () => {


  const lowPrices = data?.filter(({token, price, percentage}, index) => {
    return index < 5
  })

  const highPrices = data?.filter(({token, price, percentage}, index) => {
    return parseInt(price) >= 1000
  })

  useEffect(()=>{
    console.log({lowPrices, highPrices})
  },[])

  return (
    <>
        <div className='rounded-xl bg-block-color poppins mx-auto w-[15%] text-sm py-4 h-fit'>
          <div className='border-b border-[#44444F] py-4'>
            <p className='mb-4'>Segment by Chains</p>
{

      lowPrices?.map(({token, price, percentage, color}, index) => (
              <div key={index} className='flex justify-start gap-2 menu-items p-4 cursor-pointer hover:text-white'>
                <svg height="40" width="40" className=''>
                    <circle cx="20" cy="20" r="20" fill={color} />
               </svg>
                <div className='text-[#FAFAFB] text-left'>
                  <p className='text-xs text-[#92929D] mb-1 roboto'>Assets on {token}</p>
                  <p className='text-sm flex justify-start gap-2 items-baseline'><span>${price}</span><span className='text-[10px]'>{percentage}%</span></p>
                </div>
              </div>
      ))
}
      </div>
            <div className='py-4'>
                <p className='mb-4'>Segment by Location</p>
                {
                      highPrices?.map(({token, price, percentage, color}, index) => (
                              <div key={index} className='flex justify-start gap-2 menu-items p-4 cursor-pointer'>
                                <svg height="40" width="40" className=''>
                                    <circle cx="20" cy="20" r="20" fill={color} />
                              </svg>
                                <div className='text-[#FAFAFB] text-left'>
                                  <p className='text-xs text-[#92929D]'>Assets on {token}</p>
                                  <p className='text-sm flex justify-start gap-2 items-baseline'><span>${price}</span><span className='text-[10px]'>{percentage}%</span></p>
                                </div>
                              </div>
                      ))
}
            </div>
        </div>
    </>
  )
}

export default SideBar