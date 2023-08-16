import React from 'react';
import {formatMoney} from '../ultils/helpers';
import Treading from '../assets/trending.png';
import New from '../assets/new.png';
import {randerStarFromNumber} from '../ultils/helpers';
import {SelectOption} from './'

const Product = ({productData, isNew}) => {
    return(
        <div className='w-full text-base px-[10px]'>
           <div className='w-full border p-[15px] flex flex-col items-center'>
                <div className='w-full relative'>
                    <div className='absolute bottom-0 left-0 right-0 flex justify-center items-center gap-2'>
                        <SelectOption/>
                        <SelectOption/>
                        <SelectOption/>
                    </div>
                    <img src={productData?.thumb || 'https://3qleather.com/wp-content/themes/olympusinn/assets/images/default-placeholder.png' }
                    alt='' 
                    className='w-[243px] h-[243px] object-cover'
                    />
                    <img src={isNew ? New : Treading} alt='label' className='absolute top-[0] right-[0] w-[70px] h-[25px] object-cover'/>             
                     
                </div>
                <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
                        <span className='flex h-4'>{randerStarFromNumber(productData && productData.totalRatings)}</span>
                        <span className='line-clamp-1'>{productData && productData.title}</span>
                        <span>{`${formatMoney(productData && productData.price)}`} VNĐ</span>
                </div>
           </div>
        </div>
    )
}

export default Product