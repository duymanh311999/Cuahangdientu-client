import React, {memo, useState} from 'react';
import Treading from 'assets/trending.png';
import New from 'assets/new.png';
import {randerStarFromNumber, formatMoney} from 'ultils/helpers';
import { SelectOption} from 'components';
import icons from 'ultils/icons';
import withBaseComponent from 'hocs/withBaseComponent';
import { showModal } from 'store/app/appSlice';
import { DetailProduct } from 'pages/public';
import { apiUpdateCart } from 'apis';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncActions';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import path from 'ultils/path';

const { BsCartPlusFill,BsFillCartCheckFill, AiFillHeart, FaEye} = icons;

const Product = ({productData, isNew, normal, navigate, dispatch}) => {
    const [isShowOption, setIsShowOption] = useState(false);
    const {current} = useSelector(state => state.user)
    const handleClickOptins = async (e, flag) => {
        e.stopPropagation()
        if(flag === 'CART'){
            if(!current) return Swal.fire({
                title: 'Để tiếp tục',
                text: 'Vui lòng đăng nhập trước',
                icon: 'info',
                showCancelButton: true,
                cancelButtonText: 'Quay lại',
                confirmButtonText: 'Đăng nhập'
            }).then((rs) => {
                if(rs.isConfirmed) navigate(`/${path.LOGIN}`)
            })
            const response = await apiUpdateCart({pid: productData._id, color: productData.color})
            if(response.success){
                toast.success(response.message)
                dispatch(getCurrent())
            }
            else toast.error(response.message)
        }
        if(flag === 'WISHLIST') console.log('WHISLIST')
        if(flag === 'QUICK_VIEW'){
            dispatch(showModal({isShowModal: true, modalChildren: <DetailProduct data={{pid: productData?._id, category: productData?.category}} isQuickView />}))
        }
    }

    return(
        <div className='w-full text-base px-[10px]'>
           <div 
            className='w-full border p-[15px] flex flex-col items-center'
            onClick={() => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}
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
                        <span title='Yêu thích' onClick={(e) => handleClickOptins(e, 'WISHLIST')}>
                            <SelectOption icon={<AiFillHeart/>}/>
                        </span>      
                       {current?.cart?.some(item => item.product === productData._id.toString())
                        ?  <span title='Đã thêm vào giỏ hàng'>
                            <SelectOption icon={<BsFillCartCheckFill color='green'/>}/>
                        </span>
                        :  <span onClick={(e) => handleClickOptins(e, 'CART')} title='Thêm vào giỏ hàng' >
                        <SelectOption icon={<BsCartPlusFill/>}/>
                        </span>
                       }
                        <span title='Thông tin' onClick={(e) => handleClickOptins(e, 'QUICK_VIEW')}>
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