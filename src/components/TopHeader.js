import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import path from '../ultils/path';

const TopHeader = () => {
    return(
        <div className='h-[38px] w-full bg-main flex items-center justify-center'>
            <div className='w-main flex items-center justify-between text-xs text-white'>
                <span>ĐẶT HÀNG ONLINE HOẶC GỌI CHO CHÚNG TÔI QUA SĐT 0877.879.844</span>
                <Link className='hover:text-gray-800' to={`/${path.LOGIN}`}>Đăng Nhập hoặc Đăng Ký</Link>
            </div>
        </div>
    )
}

export default memo(TopHeader)