import React, {memo} from 'react';
import {Product} from '..'
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    draggable: false,
    slidesToShow: 3,
    slidesToScroll: 1
};

const CustomSlider = ({products, activedTab, normal}) => {
    return(
        <div>
            {products &&       
            <Slider {...settings} className='custom-slider'>
                    {products && products.map(item => (
                        <Product
                            key={item._id}
                            pid={item.id}
                            productData={item}
                            isNew={activedTab === 1 ? false : true}
                            normal={normal}
                        />
                    ))}
            </Slider>  
            } 
        </div>
    )
}

export default memo(CustomSlider)