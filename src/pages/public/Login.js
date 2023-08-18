import React, { useState, useCallback } from 'react';
import { InputField, Button} from '../../components';

 
const Login = () => {
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        name:''
    })
    const [isRegister, setIsRegister] = useState(false)

    const handleSumit = useCallback(() => {
        console.log('payload',payload)
    },[payload])

    return(
        <div className='w-full h-screen relative'>
            <img 
            src="https://media.wired.com/photos/64938cf3da92561daff93b87/16:9/w_2400,h_1350,c_limit/Walmart-and-Amazon's-Race-to-Rule-Shopping-Gear-GettyImages-1301022916.jpg"
            className='w-full h-full object-cover'
            />       
            <div className='absolute top-0 bottom-0 left-1/2 right-0 items-center justify-center flex'>
                <div className='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]'>
                    <h1 className='text-main text-[28px] font-semibold mb-8'>{!isRegister ? 'Đăng nhập' : 'Đăng ký'}</h1>
                    {isRegister && 
                      <InputField
                      value={payload.name}
                      setValue={setPayload}
                      nameKey='name'
                      />
                    }
                    <InputField
                    value={payload.email}
                    setValue={setPayload}
                    nameKey='email'
                    />
                     <InputField
                    value={payload.password}
                    setValue={setPayload}
                    nameKey='password'
                    type='password'
                    />
                    <Button
                    name={!isRegister ? 'Đăng nhập' : 'Đăng ký'}
                    handleOnClick={handleSumit}
                    fw
                    />
                    <div className='flex items-center justify-between my-2 w-full text-sm'>
                        {!isRegister &&<span className='text-blue-500 hover:underline cursor-pointer'>Quên mật khẩu?</span>}
                        {!isRegister &&<span 
                            className='text-blue-500 hover:underline cursor-pointer'
                            onClick={() => setIsRegister(true)}
                        >Đăng ký tài khoản mới</span>}
                         {isRegister &&<span 
                            className='text-blue-500 hover:underline cursor-pointer w-full text-center'
                            onClick={() => setIsRegister(false)}
                        >Đăng nhập</span>}
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default Login