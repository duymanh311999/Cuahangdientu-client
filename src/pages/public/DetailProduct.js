import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProduct, apiGetProducts } from '../../apis';
import { Breadcrumb, Button, SelectQuantity, ProductExtraInforItem, ProductInformation, CustomSlider } from '../../components';
import Slider from "react-slick";
import ReactImageMagnify from 'react-image-magnify';
import {formatMoney, fotmatPrice, randerStarFromNumber} from '../../ultils/helpers';
import {productExtraInforItem} from '../../ultils/contants'

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    draggable: false,
    slidesToShow: 3,
    slidesToScroll: 1
};

const DetailProduct = () => {
    const {pid , title, category} = useParams();
    const [product, setProduct] = useState(null);
    const [currentImage, setcurrentImage] = useState(null);
    const [relatedProduct, setRelatedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [update, setUpdate] = useState(false);
    
    const fetchProductData = async () => {
        const response = await apiGetProduct(pid)
        if(response.success){
            setProduct(response.productDatas)
            setcurrentImage(response?.productDatas?.thumb)
        }
    }
    const fetchProducts = async () => {
        const response = await apiGetProducts({category})
        if(response.success){
            setRelatedProduct(response.products)
        }
    }
    useEffect(() => {
        if(pid){
            fetchProductData()
            fetchProducts()
        }
        window.scrollTo(0,0)
    },[pid])  

    useEffect(() => {
        if(pid){
            fetchProductData()
        }
    },[update])  

    const rerender = useCallback(() => {
        setUpdate(!update)
    },[update])

    const handleQuantity = useCallback((number) => {
        if(!Number(number) || Number(number)<1){
            return
        }else{
            setQuantity(number) 
        }
        
    },[quantity])

    const handleClickImage = (e, item) => {
        e.stopPropagation()
        setcurrentImage(item)
    }

    const handleChangeQuantity = useCallback((flag) => {
        if(flag === 'minus' && quantity === 1) return
        if(flag === 'plus' && quantity === 999) return
        if(flag === 'minus'){
            setQuantity(prev => +prev -1)
        }
        if(flag === 'plus'){
            setQuantity(prev => +prev +1)
        }
    },[quantity])

    return(
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex justify-center items-center'>
                <div className='w-main'>
                    <h3 className='font-semibold'>{title}</h3>
                    <Breadcrumb title={title} category={category}/>
                </div>
            </div>
            <div className='w-main m-auto mt-4 flex'>
                <div className='flex flex-col gap-4 w-2/5'>
                    <div className='w-[458px] h-[458px] border overflow-hidden'>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'img',
                                isFluidWidth: true,
                                src: currentImage
                            },
                            largeImage: {
                                src: currentImage,
                                width: 1500,
                                height: 1500,
                            }
                        }} />
                    </div>
                    <div className='w-458px'>
                        <Slider {...settings} className='image-slider items-start'>
                            {product && product.images.map(item => (
                                <div className='flex w-full' key={item}>
                                    <img                    
                                        src={item} 
                                        alt='sub-product' 
                                        className='border h-[143px] w-[143px] object-cover cursor-pointer'
                                        onClick={e => handleClickImage(e, item)}
                                    />
                                </div>
                                
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='w-2/5 pr-[24px] flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-[30px] font-semibold'>{`${formatMoney(fotmatPrice(product && product.price))} VNĐ`}</h2>
                        <span className='text-sm text-main'>{`Kho:${product && product.quantity}`}</span>
                    </div>               
                   <div className='flex items-center gap-1'>
                        {randerStarFromNumber(product?.totalRatings)?.map((item, index) => (<span key={index}>{item}</span>))}
                        <span className='text-sm text-main italic'>{`(Đã bán:${product && product.sold})`}</span> 
                   </div>
                   <ul className='list-disc text-sm text-gray-500 pl-5'>
                        {product?.description?.map((item, index) => (<li className='leading-6' key={index}>{item}</li>))}
                   </ul>
                   <div className='flex flex-col gap-8'>
                        <div className='flex items-center gap-4'>
                            <span>Số lượng</span>
                            <SelectQuantity 
                                quantity={quantity} 
                                handleQuantity={handleQuantity} 
                                handleChangeQuantity={handleChangeQuantity}
                            />
                        </div>
                        <Button fw>Thêm vào giỏ hàng</Button>
                   </div>
                </div>
                <div className='w-1/5'>
                   {productExtraInforItem.map(item => (
                        <ProductExtraInforItem
                            key={item.id}
                            title={item.title}
                            icon={item.icons}
                            sub={item.sub}
                        />
                   ))}
                </div>
            </div>
            <div className='w-main m-auto mt-8'>
                <ProductInformation 
                    totalRatings={product && product.totalRatings} 
                    ratings={product && product.ratings }
                    nameProduct={product && product.title}
                    pid={product && product._id}
                    rerender={rerender}
                />
            </div>
            <div className='w-main m-auto mt-8'>
                <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>SẢN PHẨM TƯƠNG TỰ</h3> 
                <div className='my-8'>
                    <CustomSlider normal={true} products={relatedProduct}/>     
                </div>   
            </div>
        </div>
    )
}

export default DetailProduct