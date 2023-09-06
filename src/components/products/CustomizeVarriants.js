import { apiAddVarriant } from 'apis';
import Button from 'components/button/Button';
import Loading from 'components/common/Loading';
import InputFrom from 'components/inputs/InputFrom';
import React, { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { showModal } from 'store/app/appSlice';
import Swal from 'sweetalert2';
import { getBase64 } from 'ultils/helpers';

const CustomizeVarriants = ({customizeVarriants, setCustomizeVarriants}) => {
    const dispatch = useDispatch()
    const {register, handleSubmit, formState:{errors}, reset, watch} = useForm();
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
     })
    useEffect(() => {
        reset({
            title: customizeVarriants?.title,
            color: customizeVarriants?.color,
            price: customizeVarriants?.price,
        })
    },[customizeVarriants])

    const handleAddVarriant = async (data) => {
        if(data.color === customizeVarriants.color) Swal.fire('Có lỗi xảy ra', 'Màu sắc không có tự thay đổi', 'info')
        else {
            const formData = new FormData()
            for(let i of Object.entries(data)) {
                formData.append(i[0], i[1])
            }
            if(data.thumb){
                formData.append('thumb', data.thumb[0])
            }
            if(data.images){
                for ( let image of data.images){
                    formData.append('images', image)
                }
            }
            dispatch(showModal({isShowModal: true, modalChildren: <Loading/>}))
            const response = await apiAddVarriant(formData, customizeVarriants._id)
            dispatch(showModal({isShowModal: false, modalChildren: null}))
            if(response.success){
                toast.success(response.message)
                reset()
                setPreview({thumb: '', images: []})
            }else{
                toast.error(response.message)
            }
        }
    }

         
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


    return(
        <div className='w-full flex flex-col gap-4 relative'>
            <div className='h-[69px] w-full'></div>        
            <div className='p-4 border-b flex items-center justify-between right-0 left-[327px] fixed top-0 bg-gray-100'>
                <h1 className='text-3xl font-bold tracking-tight'>Thêm biến thể</h1>
                <span className='text-main hover:underline cursor-pointer' onClick={() => setCustomizeVarriants(null)}>Quay lại</span>
            </div>
            <form onSubmit={handleSubmit(handleAddVarriant)} className='p-4 w-full flex flex-col gap-4'>
                <div className='flex gap-4 items-center w-full'>
                    <InputFrom
                        label='Tên mặc định'
                        register={register}
                        errors={errors}
                        id='title'
                        fullWidth
                        style='flex-auto'
                        validate={{required: 'Yêu cầu phải có thông tin này'}}
                        placeholder='Tên của biến thể'
                    />
                </div>
                <div className='flex gap-4 items-center w-full'>
                    <InputFrom
                        label='Giá'
                        register={register}
                        errors={errors}
                        id='price'
                        validate={{required: 'Yêu cầu phải có thông tin này'}}
                        fullWidth
                        placeholder='Giá của biến thể'
                        type='number'
                        style='flex-auto'
                    />
                      <InputFrom
                        label='Màu sắc'
                        register={register}
                        errors={errors}
                        id='color'
                        validate={{required: 'Yêu cầu phải có thông tin này'}}
                        fullWidth
                        placeholder='Màu sắc của biến thể'
                        style='flex-auto'
                    />                   
                </div>
                        <div className='flex flex-col gap-2 my-8'>
                            <label className='font-semibold' htmlFor='thumb'>Thêm ảnh chính</label>
                            <input 
                                type='file' 
                                id='thumb'
                                {...register('thumb',{required: 'Yêu cầu phải có thông tin này'})}
                                errors={errors}
                            />
                            {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
                        </div>
                        {preview.thumb && <div className=''>
                            <img src={preview.thumb} alt='thumbnail' className='w-[200px] object-contain'/>
                        </div>}
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor='products'>Thêm ảnh phụ</label>
                            <input 
                                type='file' 
                                id='products'
                                multiple
                                {...register('images',{required: 'Yêu cầu phải có thông tin này'})}
                            />
                            {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
                        </div>
                        {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                            {preview.images?.map ((item, index) => (
                                <div 
                                    key={index} 
                                    // onMouseEnter={() => setHoverElm(item.name)} 
                                    // onMouseLeave={() => setHoverElm(null)}
                                    className='w-fit relative'
                                >
                                    <img src={item} alt='product' className='w-[200px] object-contain'/>
                                    {/* {hoverElm === item.name && <div 
                                    className='absolute cursor-pointer inset-0 bg-overlay flex items-center justify-center'
                                    onClick={() => handleRemoveImage(item.name)}
                                    >
                                        <ImBin2 size={24} color='white'/>
                                    </div>} */}
                                </div>
                            ))}
                        </div>}
                        <Button type='submit'>Thêm biến thể mới</Button>
            </form>
        </div>
    )
}

export default memo(CustomizeVarriants)