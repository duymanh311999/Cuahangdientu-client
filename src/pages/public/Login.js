import React, { useState, useCallback } from 'react';
import { InputField, Button} from '../../components';
import { apiRegister, apiLogin } from '../../apis';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { regiser } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
 
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname:'',
        lastname: '',
        mobile: ''
    })
    const [isRegister, setIsRegister] = useState(false);
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname:'',
            lastname: '',
            mobile: ''
        })
    }

    const handleSumit = useCallback( async () => {
        const {firstname, lastname, mobile, ...data} = payload;
        if(isRegister){
            const response = await apiRegister(payload)
            if(response.success){
                Swal.fire('Bạn đã đăng ký thành công', response.message,'success').then(() => {
                    setIsRegister(false)
                    resetPayload()
                })
            }else{
                Swal.fire('Đăng ký thất bại', response.message,'error')
            }
          
        }else{
            const rs = await apiLogin(data)
            if( rs.success){
                dispatch(regiser({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
                navigate(`/${path.HOME}`)  
            }else{
                Swal.fire('Đăng nhập thất bại', rs.message,'error')
            }
        }
        
    },[payload, isRegister])

    return(
        <div className='w-full h-screen relative'>
            <img 
            src="https://media.wired.com/photos/64938cf3da92561daff93b87/16:9/w_2400,h_1350,c_limit/Walmart-and-Amazon's-Race-to-Rule-Shopping-Gear-GettyImages-1301022916.jpg"
            className='w-full h-full object-cover'
            />       
            <div className='absolute top-0 bottom-0 left-1/2 right-0 items-center justify-center flex'>
                <div className='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]'>
                    <h1 className='text-main text-[28px] font-semibold mb-8'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h1>
                    {isRegister && <div className='flex items-center gap-2'>
                      <InputField 
                        value={payload.firstname}
                        setValue={setPayload}
                        nameKey='firstname'
                        />
                        <InputField
                        value={payload.lastname}
                        setValue={setPayload}
                        nameKey='lastname'
                        />
                      </div>
                    }
                    <InputField
                    value={payload.email}
                    setValue={setPayload}
                    nameKey='email'
                    />
                    {isRegister &&
                    <InputField
                    value={payload.mobile}
                    setValue={setPayload}
                    nameKey='mobile'
                    />}
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