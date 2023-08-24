import React, { memo, useCallback, useState } from 'react';
import {productInforTabs} from '../ultils/contants';
import {Votebar, Button, VoteOption, Comment} from './';
import {randerStarFromNumber} from '../ultils/helpers'; 
import { apiRatings } from '../apis';
import { useDispatch, useSelector } from 'react-redux';
import {showModal} from '../store/app/appSlice';
import Swal from 'sweetalert2';
import path from '../ultils/path';
import { useNavigate } from 'react-router-dom';


const ProductInformation = ({totalRatings, ratings, nameProduct, pid, rerender}) => {
    const [activedTabs, setActivedTabs] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {isLoggedIn} = useSelector(state => state.user);

    const handleSubmitVoteOption = async ({comment, score}) => {
        if(!comment || !pid || !score){
            alert('Vui lòng điền thông tin đánh giá')
            return
        }
        await apiRatings({star: score, comment: comment, pid, updatedAt: Date.now()})
        dispatch(showModal({isShowModal: false, modalChildren: null}))
        rerender()     
    }

    const handleVoteNow = () => {
        if(!isLoggedIn){
            Swal.fire({
                text: 'Vui lòng đăng nhập để đánh giá',
                cancelButtonAriaLabel: 'Hủy',
                confirmButtonText: 'Đăng nhập',
                title: 'Xin chào',
                showCancelButton: true               
            }).then((rs) =>{    
                if(rs.isConfirmed) {
                    navigate(`/${path.LOGIN}`)
                }
            })
        }else{
            dispatch(showModal({
                isShowModal: true, modalChildren: 
                <VoteOption 
                    nameProduct={nameProduct}
                    handleSubmitVoteOption={handleSubmitVoteOption}
                />}))
        }
    }

    return(
        <div className=''>     
            <div className='flex items-center gap-2 relative bottom-[-1px]'>
                {productInforTabs.map(item => (
                    <span 
                        className={`p-2 px-4 cursor-pointer ${activedTabs === +item.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`} 
                        key={item.id}
                        onClick={() => setActivedTabs(item.id)}
                    >
                        {item.name}
                    </span>
                ))}
                  
            </div>
            <div className='w-full border p-4'>       
                {productInforTabs.some(item => item.id === activedTabs) && productInforTabs.find(item => item.id === activedTabs)?.content  }   
            </div>        
            <div className='flex flex-col w-main py-8'>
                    <div className='flex border'>
                        <div className='flex-4 border flex flex-col items-center justify-center'>
                            <span className='font-semibold text-3xl'>{`${totalRatings}/5`}</span>
                            <span className='flex items-center gap-1'>{randerStarFromNumber(totalRatings)?.map((item, index) => (
                                <span key={index}>{item}</span>
                            ))}</span>
                            <span className='text-sm'>{`${ratings && ratings.length} Đánh giá`}</span>
                        </div>
                    <div className='flex-6 flex flex-col p-4 gap-2'>
                        {Array.from(Array(5).keys()).reverse().map(item => (
                            <Votebar
                                key={item}
                                number={item+1}
                                ratingTotal={ratings && ratings.length}
                                ratingCount={ratings && ratings.filter(childItem => childItem.star === item + 1)?.length}
                            />
                        ))}
                    </div>  
                    </div>
                    <div className='p-4 flex items-center justify-center text-sm flex-col gap-2'>
                        <span>Bạn muốn đánh giá sản phẩm này?</span>
                        <Button 
                            handleOnClick={handleVoteNow}
                        >
                            Đánh giá</Button>
                    </div>  
                    <div className='flex flex-col gap-4'>
                        {ratings?.map(item => 
                            <Comment
                                key={item._id}
                                star={item.star}
                                updatedAt={item.updatedAt}
                                comment={item.comment}
                                name={`${item?.postedBy?.firstname} ${item?.postedBy?.lastname}`}
                            />
                        )}
                    </div>          
            </div>     
        </div>
    )
}

export default memo(ProductInformation)