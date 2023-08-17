import React, {useState, useEffect, memo}  from 'react';
import icons from '../ultils/icons';
import { apiGetProducts } from '../apis/product';
import {randerStarFromNumber, secondsToHms} from '../ultils/helpers';
import {formatMoney} from '../ultils/helpers';
import { Countdown } from './';
import moment from 'moment';

const {AiFillStar, HiMenu} = icons; 

let idInterval

const DealDaily = () => {
const [dealDaily, setDealDaily] = useState(null); 
const [hours, setHours] = useState(0); 
const [minutes, setMinutes] = useState(0); 
const [secounds, setSecounds] = useState(0); 
const [expireTime, setExpireTime] = useState(false); 

    const fetchDealDaily = async () => {
        const response = await apiGetProducts({limit: 1, page: Math.round(Math.random()*7),totalRatings: 5})
        if(response.success){
            setDealDaily(response.products[0])

            const today = `${moment().format('MM/DD/YYYY')} 5:00:00`            
            const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
            const number = secondsToHms(seconds)

            setHours(number.h)
            setMinutes(number.m)
            setSecounds(number.s)
        }else{
            setHours(0)
            setMinutes(59)
            setSecounds(59)
        }
    }

    useEffect(() => {   
       idInterval && clearInterval(idInterval)
        fetchDealDaily()       
    }, [expireTime])

    useEffect(() => {   
        idInterval = setInterval(() => {
            if(secounds>0){
                setSecounds(prev => prev-1)
            }else{
                if(minutes>0){
                    setMinutes(prev => prev-1)
                    setSecounds(59)
                }else{
                    if(hours>0){             
                        setHours(prev => prev-1)
                        setMinutes(59)
                        setSecounds(59)
                    }else{
                        setExpireTime(!expireTime)
                    }
                }       
            }
        },1000)
        return () => {
            clearInterval(idInterval)
        }
    }, [secounds, minutes, hours, expireTime])
 
    return(
        <div className='border w-full flex-auto'>      
            <div className='flex items-center justify-between p-4 w-full'>
                <span className='flex-1 flex justify-center'><AiFillStar size={20} color='#DD1111' /></span>   
                <span className='flex-8 font-semibold text-[20px] flex justify-center text-gray-700'>DEAL DAILY</span>
                <span className='flex-1'></span>
            </div>
            <div className='w-full flex flex-col items-center pt-8 px-4 gap-2'>
                <img src={dealDaily?.thumb || 'https://3qleather.com/wp-content/themes/olympusinn/assets/images/default-placeholder.png' }
                    alt='' 
                    className='w-full object-contain'
                />
                <span className='flex h-4'>{randerStarFromNumber(dealDaily, 20)?.map((item, index) =>(
                        <span key={index}>{item}</span>
                    ))}
                </span>
                <span className='line-clamp-1 text-center'>{dealDaily && dealDaily.title}</span>
                <span>{`${formatMoney(dealDaily && dealDaily?.price)}`} VNĐ</span>
            </div>
            <div className='px-4 mt-8'>
                <div className='flex justify-center gap-2 mb-4'>
                    <Countdown unit={'Giờ'} number={hours}/>
                    <Countdown unit={'Phút'} number={minutes}/>
                    <Countdown unit={'Giây'} number={secounds}/>
                </div>   
                <button 
                type='button'
                className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2'
                >
                    <HiMenu />
                    <span>Thông số</span>
                </button>
            </div>
        </div>
    )
}

export default memo(DealDaily)