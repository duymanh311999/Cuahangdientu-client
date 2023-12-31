import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import path from 'ultils/path';
import { getCurrent } from 'store/user/asyncActions';
import { useSelector} from 'react-redux';
import icons from 'ultils/icons';
import { logout, clearMessage } from 'store/user/userSlice';
import Swal from 'sweetalert2';
import withBaseComponent from 'hocs/withBaseComponent';

const {LuLogOut} = icons
 
const TopHeader = ({dispatch, navigate}) => {

    const {isLoggedIn, current, mes} = useSelector(state => state.user)
    useEffect(()=> {
        const setTimeoutId = setTimeout(() => {
            if(isLoggedIn){
                dispatch(getCurrent())   
            }
        },300) 
        return () => {
            clearTimeout(setTimeoutId)
        }
    },[dispatch, isLoggedIn])

    useEffect(() => {
        if(mes) Swal.fire('Có lỗi', mes, 'info').then(() => {
            dispatch(clearMessage())
            navigate(`/${path.LOGIN}`)
        })
    },[mes])

    return(
        <div className='h-[38px] w-full bg-main flex items-center justify-center'>
            <div className='w-main flex items-center justify-between text-xs text-white'>
                <span>ĐẶT HÀNG ONLINE HOẶC GỌI CHO CHÚNG TÔI QUA SĐT 0877.879.844</span>
                {isLoggedIn && current
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
                    <Link className='hover:text-gray-800 h-[38px] items-center flex' to={`/${path.LOGIN}`}>Đăng Nhập hoặc Đăng Ký</Link>
                }
            </div>
        </div>
    )
}

export default withBaseComponent(memo(TopHeader))