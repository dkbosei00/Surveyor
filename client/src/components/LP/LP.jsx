import React, { useEffect, useState } from 'react'
import useAPIRequest from '../../hooks/useAPIRequest'
import { pool_data } from '../../data/assets';

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
        console.log(pool_data)

    }
  
  
    return (
        <div className='bg-block-color rounded-xl p-6 poppins w-4/5 h-[70vh] scrollable-element overflow-y-scroll mx-auto'>


        {
            error ? (
                <div className='w-full items-center'>
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
                    <div className='flex flex-col justify-between items-center mb-4'>
                {
                    data?.map((item, i) => {
                        console.log(item)
                        return(
                            <>
                        <p>{item.name}</p>
                        

                        {
                            Object.keys(item).filter(key => !isNaN(parseInt(key)))
                            .map(pool => {
                                const name = item[pool].name
                                if(name === 'Staked' || name === 'Farming'){
                                    return(
                                        <>
                                        <p>{name}</p>
                                        <table className='w-full border-separate border-spacing-y-6'>
                                        <tr className=' uppercase text-[#92929D] text-xs bg-[#292932] rounded-lg py-1'>
                                            <th className='p-2 text-left pl-4'>Pool</th>
                                            <th className='p-2 text-left pl-4'>Balance</th>
                                            <th className='p-2 text-left pl-4'>Rewards</th>
                                            <th className='p-2 text-left pl-4'>USD Value</th>
                                        </tr>
                                        <tr key={i} className='text-sm poppins'>
                                            <td className='flex pl-2 gap-2 items-center'>
                
                                            </td>
                                            <td className='text-left pl-4 text-[#92929D]'></td>
                                            <td className='text-left pl-4'></td>
                                            <td className='text-left pl-4'></td>
                                        </tr>
                                        </table>
                                        </>
                                    )
                                } else if(name === 'Locked'){
                                    return(
                                        <>
                                            <p>{name}</p>
                                            <table className='w-full border-separate border-spacing-y-6'>
                                            <tr className=' uppercase text-[#92929D] text-xs bg-[#292932] rounded-lg py-1'>
                                                <th className='p-2 text-left pl-4'>Pool</th>
                                                <th className='p-2 text-left pl-4'>Balance</th>
                                                <th className='p-2 text-left pl-4'>Unlock</th>
                                                <th className='p-2 text-left pl-4'>USD Value</th>
                                            </tr>
                                            <tr key={i} className='text-sm poppins'>
                                                <td className='flex pl-2 gap-2 items-center'>
    
                                                </td>
                                                <td className='text-left pl-4 text-[#92929D]'></td>
                                                <td className='text-left pl-4'></td>
                                                <td className='text-left pl-4'></td>
                                            </tr>
                                            </table>
                                        </>
                                    )
                                }else if(name === "Liquidity Pool"){
                                    return(
                                        <>
                                            <p>{name}</p>
                                            <table className='w-full border-separate border-spacing-y-6'>
                                            <tr className=' uppercase text-[#92929D] text-xs bg-[#292932] rounded-lg py-1'>
                                                <th className='p-2 text-left pl-4'>Pool</th>
                                                <th className='p-2 text-left pl-4'>Balance</th>
                                                <th className='p-2 text-left pl-4'>USD Value</th>
                                            </tr>
                                            <tr key={i} className='text-sm poppins'>
                                                <td className='flex pl-2 gap-2 items-center'>
    
                                                </td>
                                                <td className='text-left pl-4 text-[#92929D]'></td>
                                                <td className='text-left pl-4'></td>
                                                <td className='text-left pl-4'></td>
                                            </tr>
                                            </table>
                                        </>
                                    )
                                }else{
                                    return null
                                }
                            })
                        }
                        </>
                    
                    )
                    })
                }
                </div>
                    </>
                )
            )
        }
</div>
  )
}

export default LP