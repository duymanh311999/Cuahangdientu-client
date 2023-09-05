import { InputFrom, MarkdownEditor, Seleact, Button, Loading } from 'components';
import React, { memo, useState, useEffect, useCallback } from 'react';
import {useSelector, useDispatch} from 'react-redux'; 
import { useForm } from 'react-hook-form';
import {validate, getBase64 } from 'ultils/helpers'
import { apiUpdateProduct } from 'apis';
import { toast } from 'react-toastify';
import {showModal} from 'store/app/appSlice';


const UpdateProduct = ({editProduct, render, setEditProduct}) => {
    const {categories} = useSelector(state => state.app)
    const dispatch = useDispatch()
    const {register, handleSubmit, formState:{errors}, reset, watch} = useForm();
    const [payload, setPayload] = useState({
        description: ''
     })
     const [preview, setPreview] = useState({
        thumb: null,
        images: []
     })

     useEffect(() => {
        reset({
            title: editProduct?.title || '',
            price: editProduct?.price || '',
            quantity: editProduct?.quantity || '',
            color: editProduct?.color || '',
            category: editProduct?.category || '',
            brand: editProduct?.brand?.toLowerCase() || '',
        })
        setPayload({
            description: typeof editProduct?.description === 'object' ? editProduct?.description?.join(', ') : editProduct?.description
        })
        setPreview({
            thumb: editProduct?.thumb || '',
            images: editProduct?.images || [],
        })
     },[editProduct])


     const [invalidFields, setInvalidFields] = useState([])
 
     const changeValue = useCallback((e) => {
        setPayload(e)
     },[payload])
     
     const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file)
        setPreview(prev => ({...prev, thumb: base64Thumb}))
    }

    const handlePreviewImages = async (files) => {
        const imagesPreview = []
        for(let file of files){
            if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
                toast.warning('File không được hỗ trợ')
                return
            }
            const base64 = await getBase64(file)
            imagesPreview.push(base64)
        }
        setPreview(prev => ({...prev, images: imagesPreview}))
    }

    useEffect(() => {
        if(watch('thumb') instanceof FileList && watch('thumb').length > 0){
            handlePreviewThumb(watch('thumb')[0])
        }
     },[watch('thumb')])

     useEffect(() => {
        if(watch('images') instanceof FileList && watch('images').length > 0){
            handlePreviewImages(watch('images'))
        }    
     },[watch('images')])

     const handleUpdateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields)
        if(invalids === 0){
            if(data.category){
                data.category = categories?.find(el => el.title === data.category)?.title              
            }
            const finalPayload = {...data, ...payload}
            finalPayload.thumb = data?.thumb?.length === 0 ? preview.thumb : data.thumb[0]
            const formData = new FormData()
            for(let i of Object.entries(finalPayload)) {
                formData.append(i[0], i[1])
            }
            finalPayload.images = data?.images?.length === 0 ? preview.images : data.images
            for ( let image of finalPayload.images){
                formData.append('images', image)
            }
            dispatch(showModal({isShowModal: true, modalChildren: <Loading/>}))
            const response = await apiUpdateProduct(formData, editProduct._id)
            dispatch(showModal({isShowModal: false, modalChildren: null}))
            if(response.success){
                toast.success(response.message)
                render()
                setEditProduct(null)
            }else{
                toast.error(response.message)
            }
        }   
    }  

    return(
        <div className='w-full flex flex-col gap-4 relative'>
            <div className='h-[69px] w-full'></div>        
            <div className='p-4 border-b flex items-center justify-between right-0 left-[327px] fixed top-0 bg-gray-100'>
                <h1 className='text-3xl font-bold tracking-tight'>Sửa sản phẩm</h1>
                <span className='text-main hover:underline cursor-pointer' onClick={() => setEditProduct(null)}>Quay lại</span>
            </div>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleUpdateProduct)}>
                    <InputFrom
                        label='Tên sản phẩm'
                        register={register}
                        errors={errors}
                        id='title'
                        validate={{required: 'Yêu cầu phải có thông tin này'}}
                        fullWidth
                        placeholder='Tên của sản phẩm'
                    />
                    <div className='w-full my-6 flex gap-4'>
                        <InputFrom
                            label='Giá sản phẩm'
                            register={register}
                            errors={errors}
                            id='price'
                            validate={{required: 'Yêu cầu phải có thông tin này'}}
                            style='flex-auto'
                            placeholder='Giá của sản phẩm'
                            type='number'
                            fullWidth
                        />
                         <InputFrom
                            label='Số lượng'
                            register={register}
                            errors={errors}
                            id='quantity'
                            validate={{required: 'Yêu cầu phải có thông tin này'}}
                            style='flex-auto'
                            placeholder='Số lượng'
                            type='number'
                            fullWidth
                        />
                           <InputFrom
                            label='Màu sắc'
                            register={register}
                            errors={errors}
                            id='color'
                            validate={{required: 'Yêu cầu phải có thông tin này'}}
                            style='flex-auto'
                            placeholder='Màu sắc'
                            fullWidth
                        />
                    </div>
                    <div className='w-full my-6 flex gap-4'>
                        <Seleact
                             label='Nhóm sản phẩm'
                             options={categories?.map(item =>({code: item.title, value: item.title}))}
                             errors={errors}
                             register={register}
                             id='category'
                             validate={{required: 'Yêu cầu phải có thông tin này'}}
                             style='flex-auto'
                             fullWidth
                        />
                         <Seleact
                             label='Thương hiệu'
                             options={categories?.find(el => el.title === watch('category'))?.brand?.map(el => ({code: el.toLowerCase(), value: el}))}
                             errors={errors}
                             register={register}
                             id='brand'
                             style='flex-auto'   
                             fullWidth               
                        />
                    </div>
                    <MarkdownEditor
                        name='description'
                        changeValue={changeValue}
                        label='Miêu tả sản phẩm'    
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={payload.description}
                    />
                    <div className='flex flex-col gap-2 my-8'>
                        <label className='font-semibold' htmlFor='thumb'>Thêm ảnh chính</label>
                        <input 
                            type='file' 
                            id='thumb'
                            {...register('thumb')}
                            errors={errors}
                        />
                         {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
                    </div>
                    {preview.thumb && <div className=''>
                        <img src={preview.thumb} alt='thumbnail' className='w-[200px] object-contain'/>
                    </div>}
                    <div className='flex flex-col gap-2 my-8'>
                        <label className='font-semibold' htmlFor='products'>Thêm ảnh phụ</label>
                        <input 
                            type='file' 
                            id='products'
                            multiple
                            {...register('images')}
                        />
                        {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
                    </div>
                    {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                        {preview.images?.map ((item, index) => (
                            <div 
                                key={index} 
                                className='w-fit relative'
                            >
                                <img src={item} alt='product' className='w-[200px] object-contain'/>
                            </div>
                        ))}
                    </div>}
                    <Button type='submit'>Sửa sản phẩm</Button>
                </form>
            </div>
        </div>
    )
}

export default memo(UpdateProduct)