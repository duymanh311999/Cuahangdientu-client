import React, { useCallback, useEffect, useState } from 'react';
import {InputFrom, Seleact, Button, MarkdownEditor} from 'components';
import { useForm } from 'react-hook-form';
import {useSelector} from 'react-redux'; 
import { validate, getBase64 } from 'ultils/helpers'
import { toast } from 'react-toastify';
import { apiCreateProduct } from 'apis';
// import {ImBin2} from 'react-icons/im'
// import { color } from 'ultils/contants';

const CreateProduct = () => {
    const {categories} = useSelector(state => state.app)
    const {register, formState: {errors}, reset, handleSubmit, watch} = useForm();
  
     const [payload, setPayload] = useState({
        description: ''
     })
     const [preview, setPreview] = useState({
        thumb: null,
        images: []
     })
     const [invalidFields, setInvalidFields] = useState([])

     const changeValue = useCallback((e) => {
        setPayload(e)
     },[payload])
    //  const [hoverElm, setHoverElm] = useState(null)

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
            imagesPreview.push({name: file.name, path: base64})
        }
        setPreview(prev => ({...prev, images: imagesPreview}))
    }
   
     useEffect(() => {
        handlePreviewThumb(watch('thumb')[0])
     },[watch('thumb')])

     useEffect(() => {
        handlePreviewImages(watch('images'))
     },[watch('images')])

     const handleCreateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields)
        if(invalids === 0){
            if(data.category){
                data.category = categories?.find(el => el._id === data.category)?.title              
            }
            const finalPayload = {...data, ...payload}
            console.log('finalPayload',finalPayload)
            const formData = new FormData()
            for(let i of Object.entries(finalPayload)) {
                formData.append(i[0], i[1])
            }
            if(finalPayload.thumb){
                formData.append('thumb', finalPayload.thumb[0])
            }
            if(finalPayload.images){
                for ( let image of finalPayload.images){
                    formData.append('images', image)
                }
            }
            const response = await apiCreateProduct(formData)
            console.log('response',response)
        }   
    }  

    // const handleRemoveImage = (name) => {
    //     const files = [...watch('images')]
    //     reset({
    //         images: files?.filter(el => el.name !== name)
    //     })
    //     if(preview.images?.some(el => el.name === name)){
    //         setPreview(prev => ({...prev, images: prev.images?.filter(el => el.name !== name)}))
    //     }
    // }

    return(
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
                <span>Thêm mới sản phẩm</span>
            </h1>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateProduct)}>
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
                             options={categories?.map(item =>({code: item._id, value: item.title}))}
                             errors={errors}
                             register={register}
                             id='category'
                             validate={{required: 'Yêu cầu phải có thông tin này'}}
                             style='flex-auto'
                             fullWidth
                        />
                         <Seleact
                             label='Thương hiệu'
                             options={categories?.find(el => el._id === watch('category'))?.brand?.map(el => ({code: el, value: el}))}
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
                    />
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
                    <div className='flex flex-col gap-2 my-8'>
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
                                <img src={item.path} alt='product' className='w-[200px] object-contain'/>
                                {/* {hoverElm === item.name && <div 
                                className='absolute cursor-pointer inset-0 bg-overlay flex items-center justify-center'
                                onClick={() => handleRemoveImage(item.name)}
                                >
                                    <ImBin2 size={24} color='white'/>
                                </div>} */}
                            </div>
                        ))}
                    </div>}
                    <Button type='submit'>Thêm sản phẩm mới</Button>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct