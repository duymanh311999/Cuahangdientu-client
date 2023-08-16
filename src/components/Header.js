import React from 'react';
import logo from '../assets/logo_digital_new_250x.png';
import icons from '../ultils/icons'

const {RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons
const Header = () => {
    return(
        <div className='border w-main flex justify-between h-[110px] py-[35px]'>
            <img src={logo} alt='logo' className='w-[234px] object-contain'/>
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
                <div className='flex items-center px-6 border-r justify-center gap-2'>
                    <BsHandbagFill color='red'/>
                    <span>0 sản phẩm(s)</span>
                </div>
                <div className='flex items-center px-6 justify-center '><FaUserCircle size={24}/></div>
            </div>
        </div>
    )
}

export default Header