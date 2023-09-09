import { Breadcrumb, Button, OrderItem } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { formatMoney } from 'ultils/helpers';

const DetailCart = ({location}) => {
  const { currentCart } = useSelector(state => state.user);

    return(
        <div className='w-full'> 
            <div className='h-[81px] bg-gray-100 flex justify-center items-center'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>Giỏ hàng</h3>
                    <Breadcrumb category={location?.pathname}/>
                </div>  
            </div>   
            <div className='flex flex-col border w-main mx-auto my-8'>
                <div className='w-main mx-auto bg-gray-300 font-bold grid grid-cols-10 py-3'>
                  <span className='col-span-6 w-full text-center'>Sản phẩm</span>  
                  <span className='col-span-1 w-full text-center'>Số lượng</span>  
                  <span className='col-span-3 w-full text-center'>Giá</span>  
                </div>  
                {currentCart?.map(item => (
                    <OrderItem 
                      key={item._id} 
                      defaultQuantity={item.quantity}
                      item={item}
                    />
                ))} 
            </div>
            <div className='w-main mx-auto mb-12 flex flex-col justify-normal items-end gap-3'> 
                <span className='flex items-center gap-8 text-sm'>
                  <span>Tổng:</span>
                  <span className='text-main font-bold'>{`${formatMoney(currentCart?.reduce((sum, el) => +el.price*el.quantity + sum, 0))} VNĐ`}</span>  
                </span>
                <span className='text-xs italic'>Chưa tính phí vẫn chuyển và khuyến mãi</span>  
                <Button>Thanh toán</Button>
            </div>
        </div>
    )
}

export default withBaseComponent(memo(DetailCart))