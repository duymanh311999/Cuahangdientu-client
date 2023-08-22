import React, { memo, useEffect, useState } from 'react';
import icons from '../ultils/icons';
import { color } from '../ultils/contants';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { apiGetProducts } from '../apis';
import useDebounce from '../hooks/useDebounce'

const {AiOutlineDown} = icons

const SearchItem = ({name, activeClick, changeActiveFitler, type = 'checkbox'}) => {
    const navigate = useNavigate();
    const {category} = useParams()
    const [selected, setSelected] = useState([]);
    const [price, setPrice] = useState({
        from: '',
        to: ''
    });
    const [bestPrice, setBestPrice] = useState(null);
    const handleSelect = (e) => {
      const alreadyChecked = selected.find(el => el === e.target.value)
      if(alreadyChecked){
        setSelected(prev => prev.filter(el => el !== e.target.value))
      }else{
        setSelected(prev => [...prev, e.target.value])
      }  
      changeActiveFitler(null)
    }
    useEffect(() => {
        if(selected.length > 0) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({
                    color: selected.join(',')
                }).toString()
            })
        }else{
            navigate(`/${category}`)
        }
      
    },[selected])

    const fetchBestPriceProduct = async () => {
        const response = await apiGetProducts({sort: '-price', limit: 1})
        if(response.success){
            setBestPrice(response.products[0].price)
        }
    }

    useEffect(() => {
       if (type === 'input'){
        fetchBestPriceProduct()
       }
    },[type])


const deboucePriceFrom = useDebounce(price.from , 500)
const deboucePriceTo = useDebounce(price.to , 500)
    useEffect(() => {
        const data = {};
        if(Number(price.from)>0){
            data.from = price.from
        }
        if(Number(price.to)>0){
            data.to = price.to
        }
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(data).toString()
        })  
    },[deboucePriceFrom, deboucePriceTo])

    return(
        <div 
            className='p-3 cursor-pointer text-gray-500 text-xs gap-6 border border-gray-600 flex justify-between items-center relative'
            onClick={() => changeActiveFitler(name)}
        >
           <span className='capitalize'>{name}</span>
           <AiOutlineDown/>
            {activeClick === name && <div className='absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[220px]'> 
              {type === 'checkbox' && <div className=''>
                    <div className='p-4 items-center flex justify-between gap-8 border-b'>
                        <span className='whitespace-nowrap'>{`${selected.length} Đã chọn`}</span>
                        <span 
                            className='underline cursor-pointer hover:text-main'
                            onClick={e => {
                                e.stopPropagation()
                                setSelected([])
                                changeActiveFitler(null)
                            }}
                        >Làm mới</span>
                    </div>
                    <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                        {color.map((item, index)=>(
                           <div key={index} className='flex items-center gap-4'>
                                <input 
                                    type='checkbox' 
                                    className='from-checkbox'
                                    value={item}
                                    onChange={handleSelect}
                                    id={item}
                                    checked={selected.some(el => el === item)}
                                />
                                <label className='capitalize text-gray-700' htmlFor={item}>{item}</label>
                           </div>
                        ))}
                    </div>
                </div>}
                {type === 'input' && <div onClick={e => e.stopPropagation()}>
                    <div className='p-4 items-center flex justify-between gap-8 border-b'>
                        <span className='whitespace-nowrap'>{`Giá cao nhất là ${Number(bestPrice).toLocaleString()} VNĐ`}</span>
                        <span 
                            className='underline cursor-pointer hover:text-main'
                            onClick={e => {
                                e.stopPropagation()
                                setPrice({from: '', to: ''})
                                changeActiveFitler(null)
                            }}
                        >Làm mới</span>
                    </div>
                    <div className='flex items-center p-2 gap-2'>
                        <div className='flex items-center gap-2'>
                            <label htmlFor='from'>Giá từ</label>
                            <input                                                    
                                className='form-input'      
                                type='number' 
                                id='from'
                                value={price.from}
                                onChange={e => setPrice(prev => ({...prev, from: e.target.value}))}
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label htmlFor='to'>Đến</label>
                            <input 
                                className='form-input' 
                                type='number' 
                                id='to'
                                value={price.to}
                                onChange={e => setPrice(prev => ({...prev, to: e.target.value}))}
                            />
                        </div>
                    </div>
                </div>}
           </div> }
        </div>
    )
}

export default memo(SearchItem)