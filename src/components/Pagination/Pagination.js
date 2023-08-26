import React from 'react';
import usePagination from '../../hooks/usePagination';
import {PagiItem} from '../';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({totalCount}) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, 2);

  const range = () => {
    const currentPage = +params.get('page')
    const pageSize = process.env.REACT_APP_PRODUCT_LIMIT || 10
    const start = (currentPage - 1) * pageSize + 1
    const end = Math.min(currentPage * pageSize)

    return `${start} - ${end}`
  }

    return(
      <div className='flex w-main justify-between items-center'>
        {!+params.get('page') && <span className='text-sm italic'>{`Hiện thị sản phẩm 1 - ${process.env.REACT_APP_PRODUCT_LIMIT || 10} của ${totalCount}`}</span>}
        {+params.get('page') && <span className='text-sm italic'>{`Hiện thị sản phẩm ${range()} của ${totalCount}`}</span>}
          <div className='flex items-start'>
            {pagination?.map((item, index) => (   
              <PagiItem key={index}>
                 {item}
              </PagiItem>
            ))}
          </div>
      </div>
    )
}

export default Pagination