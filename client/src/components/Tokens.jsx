import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import useAPIRequest from '../hooks/useAPIRequest';
import { setChains } from '../redux/features/chainSlice';
import { cache_data } from '../data/assets';

const Tokens = ({updateData}) => {

    const ITEMS_PER_PAGE = 10;
    const dispatch = useDispatch()

    const [currentTab, setCurrentTab] = useState('change')
    const [tokenShown, setTokenShown] = useState(false)
    const chain = useSelector((state) => state.chain.chain)
    const location = useSelector((state) => state.location.location)

    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [loadCache, setLoadCache] = useState(false)
    const [amountTotal, setAmountTotal] = useState(null);
    const [currentUrl, setCurrentUrl] = useState(null)

    const { postData } = useAPIRequest()

    useEffect(() => {
        fetchTokens()
    }, [])


    useEffect(() => {
        getChainSymbol()

        let totalAmount = 0

        data?.filter(e => e.chain.toUpperCase() === chain.toUpperCase()).forEach((item) => {
            totalAmount = totalAmount + item.amount
        });

        totalAmount = totalAmount === 0 ? null : totalAmount
        setAmountTotal(totalAmount);

        // window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [chain])

    const fetchTokens = async () => {
        try {
            setIsLoading(true)
            const res = await postData({
                url: 'token/cache_balance_list?user_addr=0xebb8ee4722501358bf70559d26ef6e7b1326b3c6',
                method: 'GET'
            })
            setIsLoading(false)
            let { data, status, error } = res
            if (!status) {
                if (error.response.status === 429) {
                    setLoadCache(true)
                    setError(new Error('Too many requests. Please try again later or load cache data'))
                }
                data = null
            }
            setData(data)
            updateData(data || cache_data.data)

            const uniqueChains = [...new Set(data?.map(({ chain }, i) => chain.toUpperCase()))];

            dispatch(setChains(uniqueChains));
        }
        catch (err) {
            console.log('An error occured: ', err.message)
        }
    }

    const assetsByChain = data?.filter((asset, i) => {
        return asset.chain.toUpperCase() === chain
    })

    const getChainSymbol = () => {
        let chainSymbol = document.getElementById('chainSymbol')
        let foundSymbol = false

        let url = data?.find(e => e.optimized_symbol.toUpperCase() === chain.toUpperCase())?.logo_url || null

        if (!url) {
            data?.find(e => {
                const regex = new RegExp(chain.toUpperCase(), "i");
                if (regex.test(
                    e.optimized_symbol.toUpperCase()
                )) url = e?.logo_url
            })

        }

        console.log(url)
        setCurrentUrl(url)

        chainSymbol.style.display = url ? '' : 'none'
    }

    const loadCacheData = () => {
        setData(cache_data.data);
        setError(null)

        const uniqueChains = [...new Set(cache_data.data?.map(({ chain }, i) => chain.toUpperCase()))];

        dispatch(setChains(uniqueChains));

    }

    const totalAmount = () => {
        assetsByChain?.reduce((total, item) => {
            return total + item.amount
        }, 0)
    }

    return (
        <div className='bg-block-color rounded-xl p-6 poppins w-4/5 mx-auto h-fit'>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center gap-2'>
                    <img id='chainSymbol' src={currentUrl} className='w-[32px] h-[32px] rounded-2xl' />
                    <p className=''>Assets on {chain}</p>
                    {amountTotal !== null && <div className='price roboto'>
                        {amountTotal}
                    </div>
                    }
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
                    error ? (
                        <div className='flex justify-between w-full items-center'>
                            <tr>Could not fetch. {error.message}</tr>
                            <button className={`red-btn`}
                                onClick={loadCacheData}
                            >Load Cache Data</button>
                        </div>
                    ) : (
                        isLoading ? (
                            <tr>Loading...</tr>
                        ) : (
                            assetsByChain.map(({ logo_url, name, price, amount }, index) => (
                                <tr key={index} className='text-sm poppins'>
                                    <td className='flex pl-2 gap-2 items-center'>
                                        <img
                                            src={logo_url}
                                            className='h-[25px] w-[25px] rounded-2xl'
                                        />
                                        <span className='font-bold'>{name}</span>
                                    </td>
                                    <td className='text-left pl-4 text-[#92929D]'>${price}</td>
                                    <td className='text-left pl-4'>{amount}</td>
                                    <td className='text-left pl-4'>$1,000</td>
                                </tr>
                            ))
                        )
                    )
                }

            </table>
            {!tokenShown && assetsByChain?.length > 10 && (
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