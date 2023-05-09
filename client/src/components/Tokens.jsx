import React, { useState } from 'react'
import { data } from '../data/assets'

const Tokens = () => {

    const ITEMS_PER_PAGE = 10;

    const [currentTab, setCurrentTab] = useState('change')
    const [tokenShown, setTokenShown] = useState(false)

    const tableData = tokenShown ? data : data.slice(0, 10)

  return (
    <div className='bg-block-color rounded-xl p-6 poppins w-4/5 mx-auto h-fit'>
        <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center gap-2'>
            <svg height="32" width="32">
                <circle cx="16" cy="16" r="16" fill="red" />
            </svg>
            <svg height="32" width="32">
                  <circle cx="16" cy="16" r="16" fill="red" />
            </svg>
            <p className=''>Assets on Ethereum in Sushi</p>
            <div className='price roboto'>
                $3,150.32
            </div>
            </div>
            <div className='text-[#B5B5BE] roboto text-sm flex gap-2 transition-all duration-300'>
                <button className={` ${currentTab === 'default' ? 'red-btn' : 'bg-block-color'}`}
                onClick={() => setCurrentTab('default')}
                >Default</button>
                <button className={` ${currentTab === 'change' ? 'red-btn' : 'bg-block-color'}`}
                onClick={() => setCurrentTab('change')}
                >Change</button>
                <button className={` ${currentTab === 'summarized' ? 'red-btn' : 'bg-block-color'}`}
                onClick={() => setCurrentTab('summarized')}
                >Summarized</button>
            </div>
        </div>
        <table className='w-full border-separate border-spacing-y-6'>
            <tr className=' uppercase text-[#92929D] text-xs bg-[#292932] rounded-lg py-1'>
                <th className='p-2 text-left pl-4'>Token</th>
                <th className='p-2 text-left pl-4'>Price</th>
                <th className='p-2 text-left pl-4'>Amount</th>
                <th className='p-2 text-left pl-4'>USD Value</th>
            </tr>
            {
                tableData?.map(({color, token, price, amount}, index) => (
                    <tr key={index} className='text-sm poppins'>
                        <td className='flex pl-2 gap-2 items-center'>                        
                            <svg height="25" width="25" className=''>
                                    <circle cx="12.5" cy="12.5" r="12.5" fill={color} />
                            </svg>
                            <span className='font-bold'>{token}</span>
                        </td>
                        <td className='text-left pl-4 text-[#92929D]'>${price}</td>
                        <td className='text-left pl-4'>{amount}</td>
                        <td className='text-left pl-4'>$1,000</td>
                    </tr>
                ))
            }

        </table>
        {!tokenShown && data.length > 10 && (
            <button
              className="w-full bg-[inherit] poppins font-semibold text-xs border-t border-0 rounded-none py-4 border-[#44444F]"
              onClick={() => {
                setTokenShown(true)
              }}
            >
              View All HOLDINGS
            </button>
          )}
    </div>
  )
}

export default Tokens