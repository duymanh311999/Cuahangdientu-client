import { apiRemoveCart } from 'apis';
import Button from 'components/button/Button';
import withBaseComponent from 'hocs/withBaseComponent';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { showCart, showModal } from 'store/app/appSlice';
import { getCurrent } from 'store/user/asyncActions';
import { formatMoney } from 'ultils/helpers';
import icons from 'ultils/icons';
import path from 'ultils/path';

const {AiFillCloseCircle, BiTrashAlt} = icons

const Cart = ({dispatch, navigate}) => {
    const {currentCart} = useSelector(state => state.user)
    const removeCart = async (pid, color) =>  {
        const response = await apiRemoveCart(pid, color)
        if(response.success){
            dispatch(getCurrent())
        }
        else toast.error(response.message)
    }
    console.log(currentCart)
    return(
        <div onClick={e => e.stopPropagation()} className='w-[400px] p-6 h-screen bg-black grid grid-rows-10 text-white'>
            <header className=' border-b border-gray-500 flex justify-between items-center font-bold text-2xl row-span-1 h-full'>
                <span>Giỏ hàng</span>
                <span onClick={() => dispatch(showCart())} className='cursor-pointer p-2'><AiFillCloseCircle size={24}/></span>
            </header>
            <section className='row-span-7 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3'>
                {!currentCart && <span className='text-xs italic'>Giỏ hàng trống</span>}
                {currentCart && currentCart?.map(item => (
                    <div key={item._id} className='flex justify-between items-center'>
                       <div className='flex gap-2'>
                            <img src={item.thumbnail} alt='thumb' className='w-16 h-16 object-cover'/>
                            <div className='flex flex-col gap-1'>
                                <span className='text-sm text-main'>{item.title}</span>
                                <span className='text-[10px]'>{item.color}</span>
                                <span className='text-[10px]'>Số lượng: {item.quantity}</span>
                                <span className='text-sm'>{formatMoney(item.price) + ' vnđ'}</span>
                            </div>
                       </div>
                        <span onClick={() => removeCart(item.product?._id, item.color)} className='h-8 w-8 hover:rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer'><BiTrashAlt size={20}/></span>
                    </div>
                ))}
            </section>
            <div className='row-span-2 h-full justify-between flex flex-col'>
                <div className='pt-4 border-t border-gray-500 justify-between flex'>
                    <span>Tổng:</span>
                    <span>{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el.price)*el.quantity, 0)) + ' VNĐ'}</span>
                </div>   
                <span className='text-center text-gray-300 italic text-xs'>Chưa tính phí vẫn chuyển và khuyến mãi</span>
                <Button handleOnClick={() => {
                    dispatch(showCart())
                    navigate(`${path.DETAIL_CART}`)
                }} style='rounded-none w-full bg-main py-3'>Đặt hàng</Button>
            </div>
        </div>
    )
}  

export default withBaseComponent(memo(Cart))