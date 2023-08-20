import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import path from '../ultils/path';
import { getCurrent } from '../store/user/asyncActions';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../ultils/icons';
import { logout } from '../store/user/userSlice';

const {LuLogOut} = icons

const TopHeader = () => {
    const dispatch = useDispatch();
    const {isLoggedIn, current} = useSelector(state => state.user)
    useEffect(()=> {
        if(isLoggedIn){
            dispatch(getCurrent())
        }
    },[dispatch, isLoggedIn])
    return(
        <div className='h-[38px] w-full bg-main flex items-center justify-center'>
            <div className='w-main flex items-center justify-between text-xs text-white'>
                <span>ĐẶT HÀNG ONLINE HOẶC GỌI CHO CHÚNG TÔI QUA SĐT 0877.879.844</span>
                {isLoggedIn 
                    ? 
                    <small className='flex gap-2 text-sm items-center'>
                        <span>
                            {`Xin chào, ${current && current.firstname} ${current && current.lastname}`}
                        </span>
                        <span 
                            onClick={() => dispatch(logout())}
                            className='hover:rounded-full hover:bg-gray-200 hover:text-main cursor-pointer p-2'>
                            <LuLogOut size={18}/>
                        </span>
                    </small>  
                    :
                    <Link className='hover:text-gray-800' to={`/${path.LOGIN}`}>Đăng Nhập hoặc Đăng Ký</Link>
                }
            </div>
        </div>
    )
}

export default memo(TopHeader)