import React, { useMemo } from 'react';
import {generateRange} from '../ultils/helpers';
import {BiDotsHorizontalRounded} from 'react-icons/bi'


const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
    const PaginationArray = useMemo(() => {
        const pageSize = +process.env.REACT_APP_LIMIT || 10
        const paginationCount = Math.ceil(+totalProductCount / pageSize)
        const totalPaginationItem = +siblingCount + 5

        if(paginationCount <= totalPaginationItem){
            return generateRange(1, paginationCount)
        }

        const isShowLeft = currentPage - siblingCount > 2
        const isShowRight = currentPage + siblingCount < paginationCount - 1

        if(isShowLeft && !isShowRight){
            console.log('isShowRight',isShowRight)
            const rightStart = paginationCount - 4
            const rightRange = generateRange(rightStart, paginationCount)
            return [1, <BiDotsHorizontalRounded/>, ...rightRange]       
        }

        if(!isShowLeft && isShowRight){
            const leftRange = generateRange(1,5)
            return [...leftRange, <BiDotsHorizontalRounded/>, paginationCount]
        }

        const siblingLeft = Math.max(currentPage - siblingCount, 1)
        const siblingRight = Math.min(currentPage + siblingCount, paginationCount)
        if(siblingLeft && siblingRight){
            const middleRange = generateRange(siblingLeft,siblingRight)
            return[1, <BiDotsHorizontalRounded/>, ...middleRange, <BiDotsHorizontalRounded/>, paginationCount]
        }

    },[totalProductCount, currentPage, siblingCount])

    return PaginationArray
}

export default usePagination