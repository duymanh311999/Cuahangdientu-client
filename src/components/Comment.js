import React from 'react';
import avatar from '../assets/avata-default.jpg';
import moment from 'moment';
import {randerStarFromNumber} from '../ultils/helpers'

const Comment = ({image = avatar, name = 'Người dùng ẩn danh', updatedAt, comment, star}) => {
    return(
        <div className='flex gap-4'>
            <div className='flex-none'>
                <img src={image} alt='avatar' className='w-[25px] h-[25px] object-cover rounded-full'/>
            </div>
            <div className='flex flex-col flex-auto text-sm'>
                <div className='flex justify-between items-center'>
                    <h3 className='font-semibold'>{name}</h3>
                    <span className='text-xs italic'>{moment(updatedAt)?.fromNow()}</span>
                </div>
                <div className='flex flex-col gap-2 p-4 text-sm mt-4 border border-gray-300 py-2 bg-gray-100'>
                    <span className='flex items-center gap-1'>
                        <span className='font-semibold'>Đánh giá:</span>
                        <span className='flex items-center gap-1'>
                        {randerStarFromNumber(star)?.map((item, index) =>(
                            <span key={index}>{item}</span>
                        ))}
                        </span>
                    </span>
                    <span className='flex flex-col gap-1'>
                        <span className='font-semibold w-auto'>Bình luận:</span>
                        <span className='flex items-center gap-1'>{comment}</span>
                    </span>
                </div>
            </div>   
        </div>
    )
}

export default Comment