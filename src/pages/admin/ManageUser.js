import React, { useCallback, useEffect, useState } from 'react';
import {apiGetUsers, apiUpdateUser, apiDeleteUser} from 'apis/user';
import {roles, blockStatus} from 'ultils/contants';
import moment from 'moment';
import {InputField, Pagination, InputFrom, Seleact, Button} from 'components';
import useDebounce from 'hooks/useDebounce';
import {useSearchParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'; 
import clsx from 'clsx';

const ManageUser = () => {
    const {handleSubmit, register, formState: {errors}, reset} = useForm({
        email: '',
        firstname: '',
        lastname: '',
        role: '',
        phone: '',
        isBlocked: ''
    })
    const [users, setUsers] = useState(null)
    const [queries, setQueries] = useState({  
        q: ''   
    })
    const [update, setUpdate] = useState(false)
    const [editEl, setEditEl] = useState(null)
    const [params] = useSearchParams()
    const fetchUsers = async (params) => {
        const response = await apiGetUsers({...params, limit: process.env.REACT_APP_LIMIT})
        if(response.success){
            setUsers(response)
        }
    }

    const render = useCallback(() => {
        setUpdate(!update)
    },[update])

    const queriesDebounce = useDebounce(queries.q, 800)

    useEffect(() => {  
        const queries = Object.fromEntries([...params])
        if(queriesDebounce){
            queries.q = queriesDebounce
        } 
        fetchUsers(queries)
    },[queriesDebounce, params, update])

    const handleUpdate = async (data) => {
        const response = await apiUpdateUser(data, editEl._id)
        if(response.success){
            setEditEl(null)
            render()
            toast.success(response.message, {theme: 'colored'})
        }else{
            toast.error(response.message, {theme: 'colored'})
        }
        console.log(data)
    }
    const handleDeleteUser = (uid) => {
        Swal.fire({
            title: 'Bạn có chắc xóa người dùng này?',
            text: 'Người dùng sẽ bị xóa vĩnh viễn và không thể khôi phục',
            showCancelButton: true
        }).then(async(result) => {
            if(result.isConfirmed){
                const response = await apiDeleteUser(uid)
                if(response.success){
                    render()
                    toast.success(response.message, {theme: 'colored'})
                }else{
                    toast.error(response.message, {theme: 'colored'})
                }
            }
        }) 
    }
    
    useEffect(() => {
        if(editEl) reset({
            role: editEl.role,
            isBlocked: editEl.isBlocked
        })
    },[editEl])

    return(
        <div className={clsx('w-full', editEl && 'pl-2')}>
           <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
                <span>Quản lý người dùng</span>
           </h1>
           <div className='w-full p-4'>
                <div className='flex justify-end py-4'>
                    <InputField
                        nameKey={'q'}
                        value={queries.q}
                        setValue={setQueries}
                        style={'w500'}
                        placeholder='Tìm theo tên hoặc Email...'
                        isHideLabel
                    />
                </div>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    {editEl && <Button type='submit'>Cập nhật</Button>} 
                    <table className='table-auto mb-6 text-left w-full'>
                        <thead className='font-bold bg-gray-700 text-[13px] border border-gray-500 text-white'>
                            <tr className='border-gray-500 border'>
                                <th className='px-2 py-2'>#</th>
                                <th className='px-2 py-2'>Email</th>
                                <th className='px-2 py-2'>Họ</th>
                                <th className='px-2 py-2'>Tên</th>
                                <th className='px-2 py-2'>Vai trò</th>
                                <th className='px-2 py-2'>Số điện thoại</th>
                                <th className='px-2 py-2'>Trạng thái</th>
                                <th className='px-2 py-2'>Ngày tạo</th>
                                <th className='px-2 py-2'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.users?.map((item, index) => (                   
                                    <tr key={item._id} className='border border-gray-500'>                                 
                                        <td className='py-2 px-2'>{index+1}</td>
                                        <td className='py-2 px-2'>
                                            {editEl?._id === item._id 
                                            ? <InputFrom
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={editEl?.email}
                                                id={'email'}
                                                validate={{
                                                    required: 'Yêu cầu phải có thông tin này',
                                                    pattern: {
                                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                                        message: 'Email không hợp lệ'
                                                    }
                                                }}
                                            /> 
                                            : <span>{item.email}</span>}
                                        </td>
                                        <td className='py-2 px-2'>
                                            {editEl?._id === item._id 
                                            ? <InputFrom
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={editEl?.firstname}
                                                id={'firstname'}
                                                validate={{required: 'Yêu cầu phải có thông tin này'}}
                                            /> 
                                            : <span>{item.firstname}</span>}
                                        </td>
                                        <td className='py-2 px-2'>
                                            {editEl?._id === item._id 
                                            ? <InputFrom
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={editEl?.lastname}
                                                id={'lastname'}
                                                validate={{required: 'Yêu cầu phải có thông tin này'}}
                                            /> 
                                            : <span>{item.lastname}</span>}
                                        </td>
                                        <td className='py-2 px-2'>
                                            {editEl?._id === item._id 
                                                ? <Seleact
                                                    fullWidth
                                                    register={register}
                                                    errors={errors}
                                                    defaultValue={item.code}
                                                    id={'role'}
                                                    validate={{required: 'Yêu cầu phải có thông tin này'}}
                                                    options={roles}
                                                /> 
                                                : 
                                                <span>
                                                    {roles.find(role => +role.code === +item.role)?.value}
                                                </span>
                                            }                        
                                        </td>
                                        <td className='py-2 px-2'>
                                            {editEl?._id === item._id 
                                            ? <InputFrom
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={editEl?.mobile}
                                                id={'mobile'}
                                                validate={{
                                                    required: 'Yêu cầu phải có thông tin này',
                                                    pattern: {
                                                        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                                                        message: 'Số điện thoại không hợp lệ'
                                                    }
                                                }}
                                            /> 
                                            : <span>{item.mobile}</span>}
                                        </td>
                                        <td className='py-2 px-2'>
                                            {editEl?._id === item._id 
                                                ? <Seleact
                                                    fullWidth
                                                    register={register}
                                                    errors={errors}
                                                    defaultValue={item.isBlocked}
                                                    id={'isBlocked'}
                                                    validate={{required: 'Yêu cầu phải có thông tin này'}}
                                                    options={blockStatus}
                                                /> 
                                                : 
                                                <span>
                                                    {item.isBlocked ? 'Blocked' : 'Active'}
                                                </span>
                                            }                             
                                        </td>
                                        <td className='py-2 px-2'>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                                        <td className='py-2 '>
                                            {editEl?._id === item._id
                                            ?  <span onClick={() => setEditEl(null)} className='text-[15px] text-orange-600 hover:underline cursor-pointer'>Quay lại</span>
                                            :  <span onClick={() => setEditEl(item)} className=' text-orange-600 hover:underline cursor-pointer'>Sửa</span>
                                            }
                                            <span 
                                                onClick={() => handleDeleteUser(item._id)}
                                                className='px-2 text-orange-600 hover:underline cursor-pointer'
                                            >Xóa</span>
                                        </td>
                                    </tr>                     
                            ))}   
                        </tbody>
                    </table>
                </form>
                <div className='w-full text-right'>
                    <Pagination
                        totalCount={users?.counts}
                    />
                </div>
           </div>
        </div>
    )
}

export default ManageUser