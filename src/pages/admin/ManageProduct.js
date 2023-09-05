import React, { useCallback, useEffect, useState } from 'react';
import { CustomizeVarriants, InputFrom, Pagination } from 'components';
import { useForm } from 'react-hook-form';
import { apiGetProducts, apiDeleteProduct } from 'apis';
import moment from 'moment';
import { useSearchParams, createSearchParams, useNavigate, useLocation } from 'react-router-dom';
import useDebounce from 'hooks/useDebounce';
import {UpdateProduct} from './'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import icons from 'ultils/icons';

const { AiOutlineEdit, BiTrashAlt, BiCustomize} = icons;

const ManageProduct = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [params] = useSearchParams()
    const {register, formState: {errors}, watch} = useForm();
    const [products, setProducts] = useState(null);
    const [counts, setCounts] = useState(0);
    const [editProduct, setEditProduct] = useState(null);
    const [update, setUpdate] = useState(false);
    const [customizeVarriants, setCustomizeVarriants] = useState(null);

    const render = useCallback(() => {
        setUpdate(!update)
    })

    const fetchProducts = async (params) => {
        const response = await apiGetProducts({...params, limit: process.env.REACT_APP_LIMIT})
        if(response.success){
            setCounts(response.counts)
            setProducts(response.products)   
        }
    }

    const queryDecounce = useDebounce(watch('q'), 800)

    useEffect(() => {
        if (queryDecounce){
            navigate({
                pathname: location.pathname,
                search:createSearchParams({q: queryDecounce}).toString()
            })
        }else{
            navigate({
                pathname: location.pathname,
            })
        }
    },[queryDecounce])

    useEffect(() => {
        const searchParams = Object.fromEntries([...params])
       
        fetchProducts(searchParams)
    },[params, update])

    const handleDeleteProduct = (pid) => {
        Swal.fire({
            title: 'Xóa sản phẩm',
            text: 'Bạn có chắc chắn xóa sản phẩm này không?',
            icon: 'warning',
            showCancelButton: true
        }).then(async(rs) => {
            if(rs.isConfirmed){
                const response = await apiDeleteProduct(pid)
                if(response.success){
                    toast.success(response.message)
                }else{
                    toast.error(response.message)
                }   
                render()
            }

        })
    }
 
    return(
        <div className='w-full flex flex-col gap-4 relative'>
            {editProduct && <div className='absolute inset-0 min-h-screen bg-gray-100 z-50'>
                <UpdateProduct 
                    editProduct={editProduct} 
                    render={render}
                    setEditProduct={setEditProduct}
                />
            </div>}
            {customizeVarriants && <div className='absolute inset-0 min-h-screen bg-gray-100 z-50'>
                <CustomizeVarriants 
                    customizeVarriants={customizeVarriants} 
                    render={render}
                    setCustomizeVarriants={setCustomizeVarriants}
                />
            </div>}
            <div className='h-[69px] w-full'></div>        
            <div className='p-4 border-b w-full flex items-center justify-between fixed top-0 bg-gray-100'>
                <h1 className='text-3xl font-bold tracking-tight'>Kho sản phẩm</h1>
            </div>
            <div className='flex justify-end items-center px-4'>
                <form className='w-[45%]'>
                    <InputFrom
                        id='q'
                        register={register}
                        errors={errors}
                        fullWidth
                        placeholder='Tìm kiếm sản phẩm theo tên, miêu tả,...'
                    />
                </form>
            </div>
            <table className='table-auto'>
                <thead>
                    <tr className='bg-sky-900 text-white'>
                        <th className='text-center py-2'>STT</th>
                        <th className='text-center py-2'>Ảnh</th>
                        <th className='text-center py-2'>Tên</th>
                        <th className='text-center py-2'>Thương hiệu</th>
                        <th className='text-center py-2'>Loại</th>
                        <th className='text-center py-2'>Số lượng</th>
                        <th className='text-center py-2'>Đã bán</th>
                        <th className='text-center py-2'>Giá</th>
                        <th className='text-center py-2'>Màu</th>
                        <th className='text-center py-2'>Đánh giá</th>
                        <th className='text-center py-2'>Biến thể</th>
                        <th className='text-center py-2'>Ngày tạo</th>
                        <th className='text-center py-2'>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((item, index) => (
                        <tr className='border-b' key={item._id}>
                            <td className='text-center py-2'>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * process.env.REACT_APP_LIMIT) + index + 1}</td>
                            <td className='text-center py-2'>
                                <img src={item.thumb} alt='thumb' className='w-12 h-12 object-cover'/>
                            </td>
                            <td className='text-center py-2'>{item.title}</td>
                            <td className='text-center py-2'>{item.brand}</td>
                            <td className='text-center py-2'>{item.category}</td>
                            <td className='text-center py-2'>{item.quantity}</td>
                            <td className='text-center py-2'>{item.sold}</td>
                            <td className='text-center py-2'>{item.price}</td>
                            <td className='text-center py-2'>{item.color}</td>
                            <td className='text-center py-2'>{item.totalRatings}</td>
                            <td className='text-center py-2'>{item?.varriants?.length || 0}</td>
                            <td className='text-center py-2'>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                            <td className='text-center py-2'>
                                <span onClick={() => setEditProduct(item)} className='text-blue-500 inline-block hover:text-blue-800  cursor-pointer px-1'>
                                    <AiOutlineEdit  size={20}/>
                                </span>
                                <span onClick={() => handleDeleteProduct(item._id)} className='text-blue-500 inline-block hover:text-blue-800  cursor-pointer px-1'>
                                    <BiTrashAlt size={20}/>
                                </span>
                                <span onClick={() => setCustomizeVarriants(item)} className='text-blue-500 inline-block hover:text-blue-800  cursor-pointer px-1'>
                                    <BiCustomize size={20}/>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-end my-8'>
                <Pagination totalCount={counts}/>
            </div>
        </div>
    )
}

export default ManageProduct