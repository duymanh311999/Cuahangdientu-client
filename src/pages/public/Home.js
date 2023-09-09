import React, { memo } from 'react';
import {  Banner, Sidebar, BestSellers, DealDaily, FeatureProduct, CustomSlider } from '../../components';
import { useSelector } from 'react-redux';
import icons from '../../ultils/icons'

const {IoIosArrowForward} = icons

const Home = () => {
    const {newProducts} = useSelector(state => state.products)
    const {categories} = useSelector(state => state.app)

    return(
       <>
            <div className='w-main flex mt-6'>
                <div className='flex flex-col gap-5 w-[25%] flex-auto '>
                    <Sidebar/>
                    <DealDaily/>
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Banner/>
                    <BestSellers/>
                </div>
            </div>
            <div className='my-8'>
                < FeatureProduct/>
            </div>
            <div className='my-8 w-main'>
                <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>SẢN PHẨM MỚI</h3>          
                <div className='mt-4 mx-[-10px]'>
                    <CustomSlider
                        products={newProducts}
                    />
                </div>    
            </div>
            <div className='my-8 w-main'>
                <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>SẢN PHẨM ĐẶC BIỆT</h3>          
                <div className='flex flex-wrap gap-4 mt-4 '>
                    {categories && categories.filter(item => item.brand.length > 0).map(item => (
                        <div 
                            key={item._id}
                            className='w-[396px]'
                        >
                             <div className='border flex p-4 gap-4 min-h-[190px]'>
                                <img src={item && item.image} alt='' className='w-[144px] h-[129px] object-cover flex-1' />
                                <div className='flex-1 text-gray-700'>
                                    <h4 className='font-semibold uppercase'>{item.title}</h4>
                                    <ul className='text-sm'>
                                        {item && item.brand && item.brand.map(chidItem =>(                                
                                            <span key={chidItem} className='flex gap-1 items-center text-gray-500'>
                                                <IoIosArrowForward/>
                                                <li >{chidItem}</li>
                                            </span>
                                        ))

                                        }
                                    </ul>
                                </div>
                            </div>  
                        </div>  
                    ))}
                </div>    
            </div>
            <div className='my-8 w-main'>
                <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>TIN TỨC</h3>        
            </div>
       </>
    )
}

export default memo(Home)