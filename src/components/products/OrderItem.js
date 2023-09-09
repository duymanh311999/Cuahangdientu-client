import SelectQuantity from 'components/common/SelectQuantity';
import withBaseComponent from 'hocs/withBaseComponent';
import React, { memo, useEffect, useState } from 'react';
import { updateCart } from 'store/user/userSlice';
import { formatMoney } from 'ultils/helpers';

const OrderItem = ({item, defaultQuantity = 1, dispatch}) => {
    const [quantity, setQuantity] = useState(() => defaultQuantity);
  
    const handleQuantity = (number) => {
      if(+number > 1)  setQuantity(number)
    }
    
    const handleChangeQuantity = (flag) => {
      if(flag === 'minus' && quantity === 1) return
      if(flag === 'plus' && quantity === 999) return
      if(flag === 'minus') setQuantity(prev => +prev -1)
      if(flag === 'plus')setQuantity(prev => +prev +1)
    }

    useEffect(() => {
        dispatch(updateCart({pid: item.product?._id , quantity, color: item.color}))
    },[quantity])

    return(
        <div className='w-main mx-auto font-bold grid grid-cols-10 py-3 border-b'>
            <span className='col-span-6 w-full text-center'>
                <div className='flex gap-2 px-4 py-3'>
                        <img src={item.thumbnail} alt='thumb' className='w-28 h-28 object-cover'/>
                        <div className='flex flex-col items-start gap-1'>
                        <span className='text-sm text-main'>{item.title}</span>
                        <span className='text-[10px] font-main'>{item.color}</span>
                    </div>
                </div>
            </span>  
            <span className='col-span-1 w-full text-center'>
            <div className='flex items-center h-full'>
                <SelectQuantity
                    quantity={quantity} 
                    handleQuantity={handleQuantity} 
                    handleChangeQuantity={handleChangeQuantity}
                />
            </div>  
            </span>  
            <span className='col-span-3 w-full h-full flex items-center justify-center text-center'>
                <span className='text-lg'>{formatMoney(item.price * quantity) + ' vnđ'}</span>  
            </span>  
        </div>  
    )
}

export default withBaseComponent(memo(OrderItem))