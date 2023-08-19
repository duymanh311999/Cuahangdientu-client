import React, { useState, useCallback } from 'react';
import { InputField, Button} from '../../components';
import { apiRegister, apiLogin, apiForgotPassword } from '../../apis';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { regiser } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
 
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
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname:'',
            lastname: '',
            mobile: ''
        })
    }
    const [email , setEmail] = useState('')
    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({email})
        if(response.success){
            toast.success(response.message, {theme: 'colored'})
        }else{
            toast.info(response.message, {theme: 'colored'})
        }
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
            {isForgotPassword &&
                <div className='absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50'>
                    <div className=' flex flex-col gap-4'>
                        <label>Nhập Email của bạn:</label>
                        <input
                            type='text'
                            id='email'
                            className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
                            placeholder='Email@gmail.com'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className='flex items-center justify-end w-full gap-4'>
                            <Button
                                name='submit'
                                handleOnClick={handleForgotPassword}
                                style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2'
                            >
                                Xác nhận
                            </Button>
                            <Button
                                name='back'
                                handleOnClick={() => setIsForgotPassword(false)}
                                style='px-4 py-2 rounded-md text-white bg-orange-500 text-semibold my-2'
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </div>  
                </div>
            }          
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
                        {!isRegister &&<span onClick={() => setIsForgotPassword(true)} className='text-blue-500 hover:underline cursor-pointer'>Quên mật khẩu?</span>}
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