import { Button, InputFrom } from 'components';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import avatar from 'assets/avata-default.jpg'
import { apiUpdateCurrent } from 'apis';
import { getCurrent } from 'store/user/asyncActions';
import { toast } from 'react-toastify';

const Personal = () => {
    const {register, formState: {errors, isDirty}, handleSubmit, reset } = useForm();
    const {current} = useSelector(state => state.user);
    const dispatch = useDispatch()
    useEffect(() => {
        reset({
            firstname : current?.firstname,
            lastname : current?.lastname,
            mobile : current?.mobile,
            email : current?.email,
            avatar : current?.avatar,
        })
    },[current])

    const handleUpdateInfor = async (data) => {
        const formData = new FormData()
        if(data.avatar.length > 0) formData.append('avatar', data.avatar[0])
        delete data.avatar
        for (let i of Object.entries(data)) formData.append(i[0], i[1])
        const response = await apiUpdateCurrent(formData)
        if(response.success){
            dispatch(getCurrent())
            toast.success(response.message)
        }else{
            toast.error(response.message)
        }
    }

    return(
        <div className='w-full relative px-4'>
           <header className='text-3xl font-semibold py-4 border-b border-b-blue-200'>
                Quản lý chung
           </header>
           <form onSubmit={handleSubmit(handleUpdateInfor)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <span className='font-medium'>Ảnh đại diện:</span>
                    <label htmlFor='file'>
                        <img 
                            src={current?.avatar || avatar} 
                            alt='avatar' 
                            className='w-20 h-20 ml-8 object-cover rounded-full cursor-pointer hover:opacity-25 duration-300' 
                        />
                    </label>   
                    <input type='file' id='file' {...register('avatar')} hidden/>
                </div>
                <InputFrom
                    label='Họ'
                    register={register}
                    errors={errors}
                    id='lastname'
                    validate={{required: 'Yêu cầu phải có thông tin này'}}
                />
                <InputFrom
                    label='Tên'
                    register={register}
                    errors={errors}
                    id='firstname'
                    validate={{required: 'Yêu cầu phải có thông tin này'}}
                />       
                <InputFrom
                    label='Địa chỉ Email'
                    register={register}
                    errors={errors}
                    id='email'
                    validate={{
                        required: 'Yêu cầu phải có thông tin này',
                        pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Email không hợp lệ'
                        }
                    }}
                />
                 <InputFrom
                    label='Số điện thoại'
                    register={register}
                    errors={errors}
                    id='mobile'
                    validate={{
                        required: 'Yêu cầu phải có thông tin này',
                        pattern: {
                            value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                            message: 'Số điện thoại không hợp lệ'
                        }
                    }}
                />     
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Trạng thái:</span>
                    <span className={current?.isBlocked ? 'text-red-500' : 'text-blue-500'}>
                        {current?.isBlocked ? 'Tài khoản bị khóa' : 'Tài khoản đang hoạt động'}
                    </span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Vai trò:</span>
                    <span>{+current?.role === 9111 ? 'Người dùng' : 'Quản trị viên'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Ngày tạo:</span>
                    <span>{moment(current?.createdAt).fromNow()}</span>
                </div>
                {isDirty &&
                <div className='w-full flex justify-end'>
                     <Button type='submit'>cập nhật thông tin</Button>
                </div>}
           </form>
        </div>
    )
}

export default Personal