import React, { useCallback, useEffect, useState } from 'react';
import {useParams, useSearchParams, useNavigate, createSearchParams} from 'react-router-dom';
import { Breadcrumb, Product, SearchItem, InputSelect, Pagination } from '../../components';
import { apiGetProducts } from '../../apis';
import Masonry from 'react-masonry-css';
import { sorts } from '../../ultils/contants';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  

const Products = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState(null);
    const [activeClick, setActiveClick] = useState(null);
    const [sort, setSort] = useState('');
    const [params] = useSearchParams();
    const fetchProductsByCategory = async (queries) => {
        const response = await apiGetProducts(queries)
        if(response.success){
            setProducts(response)
        }
    }

    const {category} = useParams();

    useEffect(() => {
        const queries = Object.fromEntries([...params])
        let priceQuery = {}
        for(let i of params){
            queries[i[0]] = i[1]
        }
        if(queries.to && queries.from){
            priceQuery = {
                $and: [
                    {price: {gte: queries.from}},
                    {price: {lte: queries.to}}
                ]
            }
            delete queries.price
        }else{
            if(queries.from){
                queries.price = {gte: queries.from}
                delete queries.from
            }
            if(queries.to){
                queries.price = {lte: queries.to}
                delete queries.to
            }   
        }
              
            delete queries.to
            delete queries.from
          
            const q ={ ...priceQuery, ...queries}
        fetchProductsByCategory(q)
        window.scrollTo(0,0)
    },[params])

    const changeActiveFitler = useCallback((name) => {
        if(activeClick === name){
            setActiveClick(null)
        }else{
            setActiveClick(name)
        }  
    },[activeClick] )

    const changeValue = useCallback((value) => {
        setSort(value)
    },[sort])

    useEffect(() => {
        if(sort){
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({sort}).toString()
            })
        }
    },[sort])
    return(
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex justify-center items-center'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>{category}</h3>
                    <Breadcrumb category={category}/>
                </div>  
            </div>
            <div className='w-main border p-4 flex justify-between mt-8 m-auto'>
                <div className='w-4/5 flex-auto flex flex-col gap-3'>
                    <span className='font-semibold text-sm'>Lọc theo</span>
                    <div className='flex items-center gap-4'>
                        <SearchItem
                            name='Giá'
                            activeClick={activeClick}
                            changeActiveFitler={changeActiveFitler}
                            type='input'
                        />
                        <SearchItem
                            name='Màu sắc'
                            activeClick={activeClick}
                            changeActiveFitler={changeActiveFitler}
                        />
                    </div>
                </div>
                <div className='w-1/5 flex flex-col gap-3'>
                    <span className='font-semibold text-sm'>Lọc theo</span>
                    <div className='w-full'>
                        <InputSelect changeValue={changeValue} value={sort} options={sorts}/>
                    </div>   
                </div>
            </div>  
            <div className='w-main mt-8 m-auto'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column">
                    {products?.products?.map(item => (
                          <Product
                          key={item._id}
                          pid={item.id}
                          productData={item}
                          normal={true}
                      />
                    ))}
                </Masonry>
            </div>   
              <div className='m-auto my-4 w-main flex justify-end'>
              <Pagination 
                  totalCount={products?.counts}  
              />
            </div>
        </div>
    )
}

export default Products