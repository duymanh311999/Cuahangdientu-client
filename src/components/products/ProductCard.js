import React, { memo } from 'react';
import {randerStarFromNumber, formatMoney} from 'ultils/helpers';

const ProductCard = ({image, title,totalRatings,price}) => {
    return(
        <div className='w-1/3 flex-auto flex px-[10px] mb-[20px]' >
           <div className='flex w-full border'> 
            <img src={image} alt='products' className='w-[120px] object-contain p-4'/>
                <div className='flex flex-col gap-1 mt-[15px] items-start w-full text-xs'>            
                    <span className='line-clamp-1 capitalize text-sm'>{title && title.toLowerCase()}</span>
                    <span className='flex h-4'>{randerStarFromNumber(totalRatings, 14)?.map((item, index) =>(
                        <span key={index}>{item}</span>
                    ))}</span>
                    <span>{`${formatMoney(price)}`} VNĐ</span>
                </div>
           </div>
        </div>
    )
}

export default memo(ProductCard)