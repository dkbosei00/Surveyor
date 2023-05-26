import React, { useEffect, useState } from 'react'
import './SideBar.css'
import { data } from '../../data/assets'
import {useSelector, useDispatch} from "react-redux"
import { changeChain } from '../../redux/features/chainSlice'
import { changeLocation } from '../../redux/features/locationSlice'

const SideBar = () => {
  const dispatch = useDispatch()

  const chain = useSelector((state) => state.chain.chain)
  const chains = useSelector((state) => state.chain.chains)
  const location = useSelector((state) => state.location.location)


  const handleChain = (token) => {
    dispatch(changeChain(token))
  };

  const handleLocation = (location) => {
    dispatch(changeLocation(location))
  }

  return (
    <>
        <div className='rounded-xl bg-block-color poppins mx-auto w-[15%] text-sm py-4 h-fit'>
          <div className='border-b border-[#44444F] py-4'>
            <p className='mb-4'>Segment by Chains</p>
{
      chains.length > 0 ? (
        chains.map((item, index) => (
          <div 
          key={index} 
          onClick={() => handleChain(item)}
          className={`flex justify-start gap-2 menu-items p-4 cursor-pointer hover:text-white ${item === chain ? 'selected-item' : ''}`}>
            <svg height="40" width="40" className=''>
                <circle cx="20" cy="20" r="20" fill='red' />
           </svg>
            <div className='text-[#FAFAFB] text-left'>
              <p className='text-xs text-[#92929D] mb-1 roboto'>Assets on {item}</p>
              <p className='text-sm flex justify-start gap-2 items-baseline'><span>$0</span><span className='text-[10px]'>100%</span></p>
            </div>
          </div>
  ))
      ) : (
        <p>Could not fetch.</p>
      )

}
      </div>
            {/* <div className='py-4'>
                <p className='mb-4'>Segment by Location</p>
                {
                      highPrices?.map(({token, price, percentage, color}, index) => (
                              <div 
                              key={index} 
                              onClick={() => handleLocation(token)}
                              className={`flex justify-start gap-2 menu-items p-4 cursor-pointer ${token === location ? 'selected-item' : ''}`}>
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
            </div> */}
        </div>
    </>
  )
}

export default SideBar