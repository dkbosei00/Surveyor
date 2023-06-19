import React, { useEffect, useState } from 'react'
import useAPIRequest from '../../hooks/useAPIRequest'
import { pool_data } from '../../data/assets';
import './LP.css'
import { formatter } from '../../constants';

const LP = ({address}) => {

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const { postData } = useAPIRequest()

    const fetchProjects = async() => {
        try{
            setLoading(true)
            const res = await postData({
                url: `portfolio/project_list?user_addr=${address}`,
                method: 'GET'
            })
            setLoading(false)
            let {data, error, status} = res
            if (!status) {
                if (error.response.status === 429) {
                    setError(new Error('Too many requests. Please try again later'))
                }
                data = null
            }

            const namesOfProj = data.map((item) => item.name)
                const newData = data.map((item) => item.portfolio_item_list.map((item, i) => {return {name: namesOfProj[i], ...item}}))

                const extractedData = newData.map((item, i) => {
                    return {name: namesOfProj[i], ...item}
                })

                const display = extractedData.name
            console.log({data, newData, namesOfProj, extractedData})

            setData(extractedData)
        }
        catch(e){
            console.log("PROJECT ERROR", e.message)
        }
    }
    useEffect(()=>{
        fetchProjects()
    },[])

    const loadCacheData = () => {
        setData(pool_data);
        setError(null)
    }

    function convertTimestampToDateString(timestamp) {
        const date = new Date(timestamp * 1000); // Convert the timestamp to milliseconds
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        const dateString = `${year}/${month}/${day} ${hours}:${minutes}`;
        return dateString;
      }
  
  
    return (
        <div className=''>

            <p className='text-2xl'>Pools</p>
        {
            error ? (
                <div className='w-full items-center my-4'>
                <>
                <p>
                    Could not fetch. {error.message}
                    </p>
                <button className={`red-btn`}
                    onClick={loadCacheData}
                >Load Cache Data</button>
                </>
            </div>
            ) : (
                isLoading ? (
                    <tr>Loading...</tr>
                ) : (
                    <>
               {
                    data?.map((item, i) => {

                        const total = Object.keys(item).filter(key => !isNaN(parseInt(key))).reduce((acc, pool) => acc + item[pool].stats.asset_usd_value, 0)
                        
                        return(
                            <>
                            <div className='my-2 flex justify-between p-6 poppins w-[90%] mx-auto'>
                                <p className='text-xl'>{item.name}</p>
                                <p className=''>${
                                    formatter.format(total.toFixed(2))
                                    }
                                </p>
                            </div>
                        
                            <div className='flex flex-col justify-between items-center mb-4 bg-block-color rounded-xl p-6 poppins w-[90%] scrollable-element overflow-y-scroll mx-auto'>
                        
                        {
                            Object.keys(item).filter(key => !isNaN(parseInt(key)))
                            .map(pool => {
                                const name = item[pool].name
                                if(name === 'Staked'){
                                    return(
                                        <>
                                        <p className='red-table-title'>{name}</p>
                                        <table className='w-full border-separate border-spacing-y-6'>
                                        <tr className=' uppercase text-[#92929D] text-xs bg-[#292932] rounded-lg py-1'>
                                            <th className='p-2 text-left pl-4 w-1/4'>Pool</th>
                                            <th className='p-2 text-left pl-4 w-1/4'>Balance</th>
                                            <th className='p-2 text-left pl-4 w-1/4'>Rewards</th>
                                            <th className='p-2 text-left pl-4 w-1/4'>USD Value</th>
                                        </tr>
                                        <tr key={i} className='text-sm poppins'>
                                            <td className='flex pl-2 gap-2 items-center'>
                                            <img src={item[pool].asset_token_list[0].logo_url} className='w-[32px] h-[32px] rounded-2xl' />
                                                {item[pool].asset_token_list[0].name}
                                            </td>
                                            <td className='text-left pl-4 text-[#92929D]'>
                                            {formatter.format(item[pool].asset_token_list[0].amount.toFixed(4))} {item[pool].asset_token_list[0].symbol}
                                            </td>
                                            <td className='text-left pl-4'>
                                                {
                                                            item[pool].detail.reward_token_list ? 

                                                            item[pool].detail.reward_token_list.map((asset, i) => {
                                                                return(
                                                                    <p>{formatter.format(asset.amount.toFixed(2))} {asset.optimized_symbol}</p>
                                                                )
                                                                })
                                                            :
                                                            (
                                                                <p>N/A</p>
                                                            )
                                                }
                                            </td>
                                            <td className='text-left pl-4'>
                                            ${formatter.format(item[pool].stats.asset_usd_value.toFixed(2))}
                                            </td>
                                        </tr>
                                        </table>
                                        </>
                                    )
                                } else if(name === 'Locked'){
                                    return(
                                        <>
                                            <p className='red-table-title'>{name}</p>
                                            <table className='w-full border-separate border-spacing-y-6'>
                                            <tr className=' uppercase text-[#92929D] text-xs bg-[#292932] rounded-lg py-1'>
                                                <th className='p-2 text-left pl-4'>Pool</th>
                                                <th className='p-2 text-left pl-4'>Balance</th>
                                                <th className='p-2 text-left pl-4'>Unlock</th>
                                                <th className='p-2 text-left pl-4'>USD Value</th>
                                            </tr>
                                            <tr key={i} className='text-sm poppins'>
                                                <td className='flex pl-2 gap-2 items-center'>
                                                    <img src={item[pool].asset_token_list[0].logo_url} className='w-[32px] h-[32px] rounded-2xl' />
                                                    {item[pool].asset_token_list[0].symbol}
                                                </td>
                                                <td className='text-left pl-4 text-[#92929D]'>
                                                    {formatter.format(item[pool].asset_token_list[0].amount.toFixed(2))} {item[pool].asset_token_list[0].symbol}
                                                </td>
                                                <td className='text-left pl-4'>
                                                    {convertTimestampToDateString(item[pool].detail.unlock_at)}
                                                </td>
                                                <td className='text-left pl-4'>
                                                    ${formatter.format(item[pool].stats.asset_usd_value.toFixed(2))}
                                                </td>
                                            </tr>
                                            </table>
                                        </>
                                    )
                                } else if(name === "Liquidity Pool"){
                                    return(
                                        <>
                                            <p className='red-table-title'>{name}</p>
                                            <table className='w-full border-separate border-spacing-y-6'>
                                            <tr className=' uppercase text-[#92929D] text-xs bg-[#292932] rounded-lg py-1'>
                                                <th className='p-2 text-left pl-4'>Pool</th>
                                                <th className='p-2 text-left pl-4'>Balance</th>
                                                <th className='p-2 text-left pl-4'>USD Value</th>
                                            </tr>
                                            <tr key={i} className='text-sm poppins'>
                                                <td className='flex pl-2 gap-2 items-center'>
                                                    <div className='flex'>
                                                        <img src={item[pool].asset_token_list[0].logo_url} className='w-[32px] h-[32px] rounded-2xl' />
                                                        <img src={item[pool].asset_token_list[1].logo_url} className='w-[32px] h-[32px] rounded-2xl ml-[-15px]' />
                                                    </div>
                                                    {item[pool].asset_token_list[0].optimized_symbol} + {item[pool].asset_token_list[1].optimized_symbol}
                                                </td>
                                                <td className='text-left pl-4 text-[#92929D]'>
                                                {
                                                            item[pool].asset_token_list.map((asset, i) => {
                                                                return(
                                                                    <>
                                                                        <p>{formatter.format(asset.amount.toFixed(2))} {asset.optimized_symbol} {'\n'}</p>
                                                                    </>
                                                                )
                                                                })
                                                }
                                                </td>
                                                <td className='text-left pl-4'>
                                                ${formatter.format(item[pool].stats.asset_usd_value.toFixed(2))}
                                                </td>
                                            </tr>
                                            </table>
                                        </>
                                    )
                                } else if(name === "Vesting"){
                                    return(
                                        <>
                                            <p className='red-table-title'>{name}</p>
                                            <table className='w-full border-separate border-spacing-y-6'>
                                            <tr className=' uppercase text-[#92929D] text-xs bg-[#292932] rounded-lg py-1'>
                                                <th className='p-2 text-left pl-4'>Pool</th>
                                                <th className='p-2 text-left pl-4'>Balance</th>
                                                <th className='p-2 text-left pl-4'>Claimable Amount</th>
                                                <th className='p-2 text-left pl-4'>End Time</th>
                                                <th className='p-2 text-left pl-4'>USD Value</th>
                                            </tr>
                                            <tr key={i} className='text-sm poppins'>
                                                <td className='flex pl-2 gap-2 items-center'>
                                                    <img src={item[pool].asset_token_list[0].logo_url} className='w-[32px] h-[32px] rounded-2xl' />
                                                     {item[pool].asset_token_list[0].symbol}
                                                </td>
                                                <td className='text-left pl-4 text-[#92929D]'>
                                                    {formatter.format(item[pool].asset_token_list[0].amount.toFixed(2))} {item[pool].asset_token_list[0].symbol}
                                                </td>
                                                <td className='text-left pl-4 text-[#92929D]'>
                                                    {formatter.format(item[pool].asset_token_list[0].claimable_amount.toFixed(2))}
                                                </td>
                                                <td className='text-left pl-4'>
                                                    {convertTimestampToDateString(item[pool].detail.end_at)}
                                                </td>
                                                <td className='text-left pl-4'>
                                                    ${formatter.format(item[pool].stats.asset_usd_value.toFixed(2))}
                                                </td>
                                            </tr>
                                            </table>
                                        </>
                                    )
                                } else if(name === 'Farming'){
                                    return(
                                        <>
                                        <p className='red-table-title'>{name}</p>
                                        <table className='w-full border-separate border-spacing-y-6'>
                                        <tr className=' uppercase text-[#92929D] text-xs bg-[#292932] rounded-lg py-1'>
                                            <th className='p-2 text-left pl-4'>Pool</th>
                                            <th className='p-2 text-left pl-4'>Balance</th>
                                            <th className='p-2 text-left pl-4'>Rewards</th>
                                            <th className='p-2 text-left pl-4'>USD Value</th>
                                        </tr>
                                        <tr key={i} className='text-sm poppins'>
                                            <td className='flex pl-2 gap-2 items-center'>
                                            {
                                                            item[pool].asset_token_list.map((asset, i) => {
                                                                return(
                                                                    <img src={asset.logo_url} className={`w-[32px] h-[32px] rounded-2xl ${i > 0 ? 'ml-[-15px]' : ''}`} />
                                                                )
                                                                })
                                                        }
                                                        {
                                                            item[pool].asset_token_list.map((asset, i) => {
                                                                return(
                                                                   <p> {i > 0 ? ` +` : ''} {asset.optimized_symbol}</p>
                                                                )
                                                                })
                                                        }
                                            </td>
                                            <td className='text-left pl-4 text-[#92929D]'>
                                            {
                                                            item[pool].asset_token_list.map((asset, i) => {
                                                                return(
                                                                    <>
                                                                        <p>{formatter.format(asset.amount.toFixed(2))} {asset.optimized_symbol} {'\n'}</p>
                                                                    </>
                                                                )
                                                                })
                                                }
                                            </td>
                                            <td className='text-left pl-4'>
                                                {formatter.format(item[pool].detail?.reward_token_list[0].amount)}
                                            </td>
                                            <td className='text-left pl-4'>
                                            ${formatter.format(item[pool].stats.asset_usd_value.toFixed(2))}
                                            </td>
                                        </tr>
                                        </table>
                                        </>
                                    )
                                } else if(name === 'Rewards'){
                                    return(
                                        <>
                                            <p className='red-table-title'>{name}</p>
                                            <table className='w-full border-separate border-spacing-y-6'>
                                            <tr className='uppercase text-[#92929D] text-xs bg-[#292932] rounded-lg py-1'>
                                                <th className='p-2 text-left pl-4'>Pool</th>
                                                <th className='p-2 text-left pl-4'>Balance</th>
                                                <th className='p-2 text-left pl-4'>USD Value</th>
                                            </tr>
                                            <tr key={i} className='text-sm poppins'>
                                                <td className='flex pl-2 gap-2 items-center'>
                                                    <div className='flex items-center'>
                                                        {
                                                            item[pool].asset_token_list.map((asset, i) => {
                                                                return(
                                                                    <img src={asset.logo_url} className={`w-[32px] h-[32px] rounded-2xl ${i > 0 ? 'ml-[-15px]' : ''}`} />
                                                                )
                                                                })
                                                        }
                                                        {
                                                            item[pool].asset_token_list.map((asset, i) => {
                                                                return(
                                                                   <p> {i > 0 ? ` +` : ''} {asset.optimized_symbol}</p>
                                                                )
                                                                })
                                                        }   
                                                    </div>
                                                </td>
                                                <td className='text-left pl-4 text-[#92929D]'>
                                                {
                                                            item[pool].asset_token_list.map((asset, i) => {
                                                                return(
                                                                    <>
                                                                        <p>{formatter.format(asset.amount.toFixed(2))} {asset.optimized_symbol} {'\n'}</p>
                                                                        {/* <br/> */}
                                                                    </>
                                                                )
                                                                })
                                                }
                                                </td>
                                                <td className='text-left pl-4'>
                                                ${formatter.format(item[pool].stats.asset_usd_value.toFixed(2))}
                                                </td>
                                            </tr>
                                            </table>
                                        </>
                                    )
                                }
                                else{
                                    return null
                                }
                            })
                        }
                        </div>  
                        </>
                    )
                    })
                }

                    </>
                )
            )
        }
</div>
  )
}

export default LP