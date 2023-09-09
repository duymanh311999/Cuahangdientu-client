import React, {memo, useState} from 'react';
import { Button } from '../../components';
import {useParams} from 'react-router-dom';
import { apiResetPassword } from '../../apis';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const {token} = useParams();
    console.log(token)
    const handleResetPassword = async () => {
        const response = await apiResetPassword({password, token})
        if(response.success){
            toast.success(response.message, {theme: 'colored'})
        }else{
            toast.error(response.message, {theme: 'colored'})
        }
    }
    return(
          <div className='absolute top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50'>
            <div className=' flex flex-col gap-4'>
                <label>Nhập mật khẩu mới của bạn:</label>
                <input
                    type='text'
                    id='password'
                    className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
                    placeholder='Nhập mật khẩu'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className='flex items-center justify-end w-full gap-4'>
                    <Button
                        name='submit'
                        handleOnClick={handleResetPassword}
                        style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2'
                    >
                        Xác nhận
                    </Button>
                </div>
            </div>  
        </div>
    )
}

export default memo(ResetPassword)