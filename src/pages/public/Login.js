import React, { useState, useCallback, useEffect } from 'react';
import { InputField, Button, Loading} from 'components';
import { apiRegister, apiLogin, apiForgotPassword, apiFinalRegister } from 'apis';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import path from 'ultils/path';
import { login } from 'store/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validate } from 'ultils/helpers';
import {showModal} from 'store/app/appSlice';
  
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
    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);
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
    const [token , setToken] = useState('')
    const [email , setEmail] = useState('')
    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({email})
        if(response.success){
            toast.success(response.message, {theme: 'colored'})
        }else{
            toast.info(response.message, {theme: 'colored'})
        }
    }
    useEffect(() => {
        resetPayload()
    },[isRegister])
    const handleSumit = useCallback( async () => {
        const {firstname, lastname, mobile, ...data} = payload;
        const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
        if(invalids === 0){
            if(isRegister){
                dispatch(showModal({isShowModal: true, modalChildren: <Loading/>}))
                const response = await apiRegister(payload)
                dispatch(showModal({isShowModal: false, modalChildren: null}))
                if(response.success){
                    setIsVerifiedEmail(true)
                }else{
                    Swal.fire('Đăng ký thất bại', response.message,'error')
                }
                
            }else{
                dispatch(showModal({isShowModal: true, modalChildren: <Loading/>}))
                const rs = await apiLogin(data)
                dispatch(showModal({isShowModal: false, modalChildren: null}))
                if( rs.success){
                    dispatch(login({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
                    navigate(`/${path.HOME}`)  
                }else{
                    Swal.fire('Đăng nhập thất bại', rs.message,'error')
                }
            }
        }   
    },[payload, isRegister])

    const finalRegister = async () => {
       const response = await apiFinalRegister(token)
       if(response.success){
        Swal.fire('Bạn đã đăng ký thành công', response.message,'success').then(() => {
            setIsRegister(false)
            resetPayload()
        })
       }else{
        Swal.fire('Đăng ký thất bại', response.message,'error')
        }
       setIsVerifiedEmail(false)
       setToken('')
    }

    return(
        <div className='w-full h-screen relative'>
            {isVerifiedEmail && <div className='absolute top-0 left-0 bottom-0 right-0 bg-overlay z-50 flex flex-col items-center justify-center'> 
                <div className='bg-white w-[500px] rounded-md p-8'>
                    <h4 className=''>Chúng tôi đã gửi mã xác nhận về Email của bạn, vui lòng kiểm tra Email để nhận code</h4>
                    <input 
                        type='text'
                        value={token}
                        onChange={e => setToken(e.target.value)}
                        className='p-2 border rounded-md outline-none'
                    />
                    <button 
                        type='button' 
                        className='px-4 py-2 bg-blue-500 font-semibold text-white rounded-md ml-4'
                        onClick={finalRegister}
                    >
                        Xác nhận
                    </button>
                </div>
            </div> }
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
                                name='Xác nhận'
                                handleOnClick={handleForgotPassword}
                                style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2'
                            >
                                Xác nhận
                            </Button>
                            <Button
                                name='Quay lại'
                                handleOnClick={() => setIsForgotPassword(false)}
                                style='px-4 py-2 rounded-md text-white bg-orange-500 text-semibold my-2'
                            >
                                Quay lại
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
                    {isRegister && <div className='flex items-center gap-2' >
                      <InputField 
                        value={payload.firstname}
                        setValue={setPayload}
                        nameKey='firstname'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        fullWidth
                        />
                        <InputField
                        value={payload.lastname}
                        setValue={setPayload}
                        nameKey='lastname'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        fullWidth
                        />
                      </div>
                    }
                    <InputField
                    value={payload.email}
                    setValue={setPayload}
                    nameKey='email'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    fullWidth
                    />
                    {isRegister &&
                    <InputField
                    value={payload.mobile}
                    setValue={setPayload}
                    nameKey='mobile'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    fullWidth
                    />}
                     <InputField
                    value={payload.password}
                    setValue={setPayload}
                    nameKey='password'
                    type='password'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    fullWidth
                    />
                    <Button
                    handleOnClick={handleSumit}
                    fw
                    >
                         {!isRegister ? 'Đăng nhập' : 'Đăng ký'}
                    </Button>
                       
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
                    <Link className='text-gray-700 mt-4 text-sm hover:underline cursor-pointer' to={`/${path.HOME}`}> -Về trang chủ-</Link>
                </div>  
            </div>
        </div>
    )
}

export default Login