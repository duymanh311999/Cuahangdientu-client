import React, {Fragment, memo, useEffect, useState} from 'react';
import logo from 'assets/logo.png';
import icons from 'ultils/icons';
import {Link} from 'react-router-dom';
import path from 'ultils/path';
import { useSelector } from 'react-redux';
import { logout } from 'store/user/userSlice';
import withBaseComponent from 'hocs/withBaseComponent';

const {RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons
const Header = (props) => {
    const {current} = useSelector(state => state.user);
    const [isShowOption, setIsShowOption] = useState(false);
    useEffect(() => {
        const handleClickoutOptins = (e) => {
           const profile = document.getElementById('profile')
           if(!profile?.contains(e.target)) setIsShowOption(false)
        }
        document.addEventListener('click', handleClickoutOptins)
        return () => {
            document.removeEventListener('click', handleClickoutOptins)
        }
    },[])

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
                        id='profile'
                    >
                        <FaUserCircle />
                        <span>Tài khoản</span>
                       {isShowOption &&  <div onClick={e => e.stopPropagation()} className='absolute top-full flex flex-col left-[16px] bg-gray-100 border min-w-[150px] py-2'>
                            <Link className='p-2 w-full hover:bg-sky-100' to={`/${path.MEMBER}/${path.PERSONAL}`}>
                                Thông tin cá nhân
                            </Link>
                            {+current.role === 1999 && 
                            <Link className='p-2 w-full hover:bg-sky-100' to={`/${path.ADMIN}/${path.DASHBOARD}`}>Trang quản trị</Link>}
                            <span 
                                className='p-2 w-full hover:bg-sky-100'
                                onClick={() => props.dispatch(logout())}
                            >Đăng xuất</span>
                        </div>  }                  
                    </div>
                </Fragment>}      
            </div>
        </div>
    )
}

export default withBaseComponent(memo(Header))