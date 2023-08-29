import React, { memo } from 'react';
import usePagination from '../../hooks/usePagination';
import {PagiItem} from '../';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({totalCount}) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, params.get('page') || 1);

  const range = () => {
    const currentPage = +params.get('page')
    const pageSize = +process.env.REACT_APP_LIMIT || 10
    const start = (currentPage - 1) * pageSize + 1    
    const end = Math.min(currentPage * pageSize, totalCount)
  
    return `${start} - ${end}`
  }


    return(
      <div className='flex w-full justify-between items-center'>
        {!+params.get('page') ? <span className='text-sm italic'>{`Hiện thị sản phẩm 1 - ${Math.min(+process.env.REACT_APP_LIMIT, totalCount) || 10} của ${totalCount}`}</span> : ''}
        {+params.get('page') ? <span className='text-sm italic'>{`Hiện thị sản phẩm ${range()} của ${totalCount}`}</span> : ''}
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

export default memo(Pagination)