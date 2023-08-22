import React, {memo} from 'react';

const SelectQuantity = ({quantity, handleQuantity, handleChangeQuantity}) => {
    return(
        <div className='flex items-center'>
            <span onClick={() => handleChangeQuantity('plus')} className='p-2 border-black border-r cursor-pointer'>+</span>
            <input 
                className='py-2 outline-none w-[50px] text-center' 
                type='text'
                value={quantity}
                onChange={e => handleQuantity(e.target.value)}
            />
            <span onClick={() => handleChangeQuantity('minus')} className='p-2 border-black border-l cursor-pointer'>-</span>
        </div>
    )
}

export default memo(SelectQuantity)