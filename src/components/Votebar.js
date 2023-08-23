import React, {useEffect, useRef} from 'react';
import icons from '../ultils/icons';

const {AiFillStar} = icons

const Votebar = ({number, ratingCount, ratingTotal}) => {
    const percentRef = useRef()

    useEffect(() => {
        const percent = Math.round(ratingCount *100 / ratingTotal) || 0
        percentRef.current.style.cssText = `right: ${100 - percent}%`
    },[ratingCount, ratingTotal])

    return(
        <div className='flex items-center gap-2 text-sm text-gray-500'>
           <div className='flex w-[10%] items-center justify-center gap-1 text-sm'>
                <span>{number}</span>
                <AiFillStar color='orange'/>
           </div>
           <div className='w-[75%]'>
                <div className='relative w-full h-[6px] bg-gray-200 rounded-r-full rounded-l-full'>
                    <div ref={percentRef} className='absolute bg-red-500 inset-0'> </div>    
                </div>  
           </div>
           <div className='w-[15%] text-xs text-400 flex justify-end'>
                {`${ratingCount || 0} Đánh giá`}
           </div>
        </div>
    )
}

export default Votebar