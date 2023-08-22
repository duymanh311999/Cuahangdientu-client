import React, { memo, useEffect, useState } from 'react';
import {productInforTabs} from '../ultils/contants';

const activedStyles = '';
const noyActivedStyles = '';

const ProductInformation = () => {
    const [activedTabs, setActivedTabs] = useState(1)
    return(
        <div>
            <div className='flex items-center gap-2 relative bottom-[-1px]'>
                {productInforTabs.map(item => (
                    <span 
                        className={`p-2 px-4 cursor-pointer ${activedTabs === +item.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`} 
                        key={item.id}
                        onClick={() => setActivedTabs(item.id)}
                    >
                        {item.name}
                    </span>
                ))}
            </div>
            <div className='w-full border p-4'>  
                {productInforTabs.some(item => item.id === activedTabs) && productInforTabs.find(item => item.id === activedTabs)?.content  }    
            </div>
        </div>
    )
}

export default memo(ProductInformation)