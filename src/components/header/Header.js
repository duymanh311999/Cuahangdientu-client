import React, {Fragment, memo, useState} from 'react';
import logo from 'assets/logo.png';
import icons from 'ultils/icons';
import {Link} from 'react-router-dom';
import path from 'ultils/path';
import { useSelector } from 'react-redux';

const {RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons
const Header = () => {
    const {current} = useSelector(state => state.user)
    const [isShowOption, setIsShowOption] = useState(false)

    return(
        <div className='w-main flex justify-between h-[110px] py-[35px]'>
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt='logo' className='w-[234px] object-contain'/>
            </Link>      
            <div className='flex text-[13px]'>
                <div className='flex flex-col px-6 border-r items-center'>
                    <span className='flex gap-2 items-center'>
                        <RiPhoneFill color='red'/>
                        <span className='font-semibold'>0877879844</span>
                    </span>
                    <span>T2-T7 9:00AM - 8:00PM</span>
                </div>
                <div className='flex flex-col px-6 border-r items-center'>
                    <span className='flex gap-2 items-center'>
                        <MdEmail color='red'/>
                        <span className='font-semibold'>DUYMANH311999@GMAIL.COM</span>
                    </span>
                    <span>Hỗ trợ 24/7</span>
                </div>
                {current && <Fragment>
                    <div className='flex items-center px-6 border-r justify-center gap-2 cursor-pointer'>
                        <BsHandbagFill color='red'/>
                        <span>0 sản phẩm(s)</span>
                    </div>
                    <div 
                        className='flex items-center px-6 justify-center gap-2 cursor-pointer relative'
                        onClick={() => setIsShowOption(prev => !prev)}
                    >
                        <FaUserCircle />
                        <span>Tài khoản</span>
                        <div className='absolute top-full left-0 bg-gray-100 border min-w-[200px] py-2'>
                            <Link className='p-2 w-full hover:bg-sky-100' to={`/${path.MEMBER}/${path.PERSONAL}`}>Thông tin cá nhân</Link>
                        </div>
                    </div>
                </Fragment>}      
            </div>
        </div>
    )
}

export default memo(Header)