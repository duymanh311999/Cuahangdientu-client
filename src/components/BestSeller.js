import React , {useState, useEffect} from 'react';
import {apiGetProducts} from '../apis/product';
import { CustomSlider} from '../components';
import { getNewProducts} from '../store/products/asyncActions';
import { useDispatch, useSelector } from 'react-redux';

const tabs = [
    {id: 1, name:'BÁN CHẠY NHẤT'},
    {id: 2, name:'SẢN PHẨM MỚI NHẤT'}
]


const Bestseller = () => {
    const [bestSellers, setBestSellers] = useState(null);
    const [activedTab, setActivedTab] = useState(1);
    const [products, setProducts] = useState(null);
    const dispatch = useDispatch();
    const {newProducts} = useSelector(state => state.products)

    const fetchProducts = async () => {
        const response = await apiGetProducts({sort:'-sold'});
        if (response&& response.success){
            setBestSellers(response.products)
            setProducts(response.products)
        }
    }

    useEffect(() => {
        fetchProducts()
        dispatch(getNewProducts())
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
                    className={`font-semibold uppercase border-r pr-4 cursor-pointer text-gray-400 ${activedTab === item.id ? 'text-gray-900' : ''} `}
                    key={item.id}
                    onClick={() => setActivedTab(item.id)}
                    >
                        {item.name}
                    </span>
                ))}
            </div>
            <div className='mt-4 mx-[-10px]'>
                <CustomSlider products={products} activedTab={activedTab}/>
            </div>
            <div className='w-full flex gap-4 mt-4'>
               <img 
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657'
                    alt='banner'
                    className='flex-1 object-contain'
               />
                <img 
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657'
                    alt='banner'
                    className='flex-1 object-contain'
               />
            </div>
        </div>
    )
}  

export default Bestseller