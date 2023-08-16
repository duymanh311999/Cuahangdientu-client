import React , {useState, useEffect} from 'react';
import {apiGetProducts} from '../apis/product';
import {Product} from '../components'
import Slider from "react-slick";

const tabs = [
    {id: 1, name:'BÁN CHẠY NHẤT'},
    {id: 2, name:'SẢN PHẨM MỚI NHẤT'}
]

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const Bestseller = () => {
    const [bestSellers, setBestSellers] = useState(null);
    const [newProducts, setNewProducts] = useState(null);
    const [activedTab, setActivedTab] = useState(1);
    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        const response = await Promise.all([apiGetProducts({sort:'-sold'}),apiGetProducts({sort:'-createdAt'})]);
        if (response[0] && response[0].success){
            setBestSellers(response[0].products)
            setProducts(response[0].products)
        }
        if (response[1] && response[1].success){
            setNewProducts(response[1].products)
        }
        setProducts(response[0].products)
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    useEffect(() => {
        if(activedTab === 1 ){
            setProducts(bestSellers)
        }
        if(activedTab === 2 ){
            setProducts(newProducts)
        }
    }, [activedTab])
    return(
        <div>
             <div className='flex text-[18px] gap-8 pb-4 border-b-2 border-main'>
                {tabs.map(item => (
                    <span 
                    className={`font-semibold capitalize border-r pr-4 cursor-pointer text-gray-400 ${activedTab === item.id ? 'text-gray-900' : ''} `}
                    key={item.id}
                    onClick={() => setActivedTab(item.id)}
                    >
                        {item.name}
                    </span>
                ))}
            </div>
            <div className='mt-4 mx-[-10px]'>
            <Slider {...settings}>
                {products && products.map(item => (
                    <Product
                        key={item._id}
                        productData={item}
                        isNew={activedTab === 1 ? false : true}
                    />
                ))}
                </Slider>
            </div>
        </div>
    )
}

export default Bestseller