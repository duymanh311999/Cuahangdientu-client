import React, { memo } from 'react';
import icons from 'ultils/icons';

const {MdEmail} = icons

const Footer = () => {
    return(
        <div className='w-full '>      
                <div className='h-[103px] w-full bg-main flex items-center justify-center '>
                    <div className='w-main flex items-center justify-between'>
                        <div className='flex flex-col flex-1'>
                            <span className='text-[20px] text-gray-100'> ĐĂNG KÝ ĐỂ NHẬN THÊM THÔNG TIN</span>
                            <span className='text-[13px] text-gray-300'>Nhận được những khuyến mãi hàng tuần một cách sớm nhất</span>
                        </div>
                        <div className='flex-1 flex items-center'>
                            <input 
                                type='text' 
                                name='' 
                                id=''
                                className='p-4 pr-0 rounded-l-full w-full bg-[#F04646] flex-1 outline-none text-gray-100 
                                placeholder:text-sm placeholder:text-gray-200 placeholder:opacity-50'
                                placeholder='Email address'
                            />
                            <div className='h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center text-white'>
                                <MdEmail size={18}/>
                            </div>
                        </div>              
                    </div>
                </div>
                <div className='h-[407px] w-full bg-gray-800 flex items-center justify-center text-white text-[13px]'>
                    <div className='w-main flex'>
                        <div className='flex-2 flex flex-col gap-2'>
                            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>VỀ CHÚNG TÔI</h3>
                            <span>
                                <span>Địa chỉ: </span> 
                                <span className='opacity-50'>T10 - 458 Phố Minh Khai, Hai Bà Trưng, Hà Nội</span>
                            </span>
                            <span>
                                <span>Số điện thoại: </span> 
                                <span className='opacity-50'>0877.879.844</span>
                            </span>
                            <span>
                                <span>Email: </span> 
                                <span className='opacity-50'>Duymanh311999@gmail.com</span>
                            </span>
                        </div>
                        <div className='flex-1 flex flex-col gap-2'>
                            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>THÔNG TIN</h3>
                            <span>Thông tin</span> 
                            <span>Phòng trưng bày</span>
                            <span>Địa chỉ cửa hàng</span>
                            <span>Ưu đãi hôm nay</span>
                            <span>Liên hệ</span>
                        </div>
                        <div className='flex-1 flex flex-col gap-2'>
                            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>CHÚNG TÔI LÀ AI</h3>
                            <span>Giúp đỡ</span> 
                            <span>Giao hàng</span>
                            <span>FAQs</span>
                            <span>Chính sách đổi trả</span>
                            <span>Xác thực</span>
                        </div>
                        <div className='flex-1'>
                            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px] '>#DIGITALWORLDSTORE</h3>
                        </div>
                    </div>
                </div>      
        </div>
    )
}

export default memo(Footer)