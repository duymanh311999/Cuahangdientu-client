import React, { memo, useEffect, useRef, useState } from 'react';
import logo from 'assets/logo.png';
import {voteOptions} from 'ultils/contants';
import icons from 'ultils/icons';
import {Button} from 'components'

const {AiFillStar} = icons

const VoteOption = ({nameProduct, handleSubmitVoteOption}) => {
    const [chosenScore, setChosenScore] = useState(null)
    const modalRef = useRef();
    const [comment, setComment] = useState('')

    useEffect(() => {
        modalRef.current.scrollIntoView({block : 'center', behavior: 'smooth' })
    },[])
    return(
        <div onClick={e => e.stopPropagation()} ref={modalRef} className='bg-white w-[700px] p-4 flex flex-col gap-4 items-center justify-center'>
            <img src={logo} alt='logo' className='w-[300px] my-8 object-contain'/>
            <h2 className='text-center text-medium text-lg'>{`Đánh giá sản phẩm: ${nameProduct}`}</h2>
            <textarea 
                className='form-textarea w-full placeholder:text-xs placeholder:text-gray-500 placeholder:italic text-sm'
                placeholder='Nhập gì đó...'
                value={comment}
                onChange={e => setComment(e.target.value)}
            ></textarea>
            <div className='w-full felx flex-col gap-4'>
                <p>Bạn thấy sản phẩm này như thế nào?</p>
                <div className='flex items-center justify-center gap-4 mt-4'>
                    {voteOptions.map(item => (
                        <div 
                            className='w-[100px] h-[100px] flex items-center justify-center flex-col gap-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md p-2' 
                            key={item.id}
                            onClick={() => setChosenScore(item.id)}
                        >
                            {(Number(chosenScore) && chosenScore >= item.id) ?  <AiFillStar color='orange'/> : <AiFillStar color='gray'/>}
                            <span className='text-[12px]'>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button handleOnClick={() => handleSubmitVoteOption({comment, score: chosenScore})} fw>Xác nhận</Button>
        </div>
    )
}

export default memo(VoteOption)