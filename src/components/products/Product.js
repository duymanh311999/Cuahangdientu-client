import React, {memo, useState} from 'react';
import Treading from 'assets/trending.png';
import New from 'assets/new.png';
import {randerStarFromNumber, formatMoney} from 'ultils/helpers';
import {SelectOption} from 'components';
import icons from 'ultils/icons';
import { Link } from 'react-router-dom';
import withBaseComponent from 'hocs/withBaseComponent';

const { HiMenu, AiFillHeart, FaEye} = icons;

const Product = ({productData, isNew, normal, navigate}) => {
    const [isShowOption, setIsShowOption] = useState(false);
    const handleClickOptins = (e, flag) => {
        e.stopPropagation()
        if(flag === 'MENU') navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)
        if(flag === 'WISHLIST') console.log('WHISLIST')
        if(flag === 'QUICK_VIEW') console.log('QUICK VIEW')
    }

    return(
        <div className='w-full text-base px-[10px]'>
           <div 
            className='w-full border p-[15px] flex flex-col items-center'
            onClick={e => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}
            onMouseEnter={e => {
                e.stopPropagation()
                setIsShowOption(true)   
            }}
            onMouseLeave={e => {
                e.stopPropagation()
                setIsShowOption(false)
            }}
           >
                <div className='w-full relative'>
                    {isShowOption && 
                        <div className='absolute bottom-0 left-0 right-0 flex justify-center items-center gap-2 animate-slide-top'>
                        <span onClick={(e) => handleClickOptins(e, 'WISHLIST')}>
                            <SelectOption icon={<AiFillHeart/>}/>
                        </span>      
                        <span onClick={(e) => handleClickOptins(e, 'MENU')}>
                            <SelectOption  icon={<HiMenu/>}/>
                        </span>
                        <span onClick={(e) => handleClickOptins(e, 'QUICK_VIEW')}>
                            <SelectOption icon={<FaEye/>}/>
                        </span>
                        </div>
                    }
                    <img src={productData?.thumb || 'https://3qleather.com/wp-content/themes/olympusinn/assets/images/default-placeholder.png' }
                    alt='' 
                    className='w-[274px] h-[274px] object-cover'
                    />             
                     {!normal && 
                        <img src={isNew ? New : Treading} alt='label' className='absolute top-[0] right-[0] w-[70px] h-[25px] object-cover'/>
                     }
                </div>
                <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
                        <span className='flex h-4'>{randerStarFromNumber(productData && productData.totalRatings)?.map((item, index) =>(
                            <span key={index}>{item}</span>
                        ))}</span>
                        <span className='line-clamp-1'>{productData && productData.title}</span>
                        <span>{`${formatMoney(productData && productData.price)}`} VNĐ</span>
                </div>
           </div>
        </div>
    )
}

export default withBaseComponent(memo(Product))