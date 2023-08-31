import React, { memo, Fragment, useState } from 'react';
import logo from 'assets/logo.png';
import {adminSidebar} from 'ultils/contants'
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import icons from 'ultils/icons';

const {AiFillCaretDown, AiFillCaretUp} = icons

const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-blue-500'
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-blue-100'

const AdminSidebar = () => {
    const [actived , setActived] = useState([])
    const handleShowTabs = (TabID) => {
        if(actived.some(el => el === TabID)){
            setActived(prev => prev.filter(el => el !== TabID))
        }else{
            setActived(prev => [...prev, TabID])
        }
    }

    return(
        <div className='bg-white h-full py-4'>
            <Link to={'/'} className='flex flex-col justify-center items-center p-4 gap-2'>
                <img src={logo} alt='logo' className='w-[200px] object-contain'/>
                <small>Trang quản trị viên</small>
            </Link>
            <div>
                {adminSidebar.map(item => (
                    <Fragment key = {item.id}>
                        {item.type === 'SINGLE' && <NavLink 
                            to={item.path}
                            className={({isActive}) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}
                        >
                            <span>{item.icon}</span>
                            <span>{item.text}</span>
                        </NavLink>}
                        {item.type === 'PARENT' && <div onClick={() => handleShowTabs(+item.id)} className='flex flex-col'>
                            <div className='flex items-center justify-between px-4 py-2 hover:bg-blue-100 cursor-pointer'>
                                <div className='flex items-center gap-2'>
                                    <span>{item.icon}</span>
                                    <span>{item.text}</span>  
                                </div>
                                {actived.some(id => +id === +item.id) ? <AiFillCaretUp/> : <AiFillCaretDown/> }
                                  
                            </div>
                            {actived.some(id => +id === +item.id) && <div className='flex flex-col'>
                                {item.submenu.map(childItem => (
                                    <NavLink 
                                        key={childItem.text} 
                                        to={childItem.path}   
                                        onClick={e => e.stopPropagation()}           
                                        className={({isActive}) => clsx(isActive && activedStyle, !isActive && notActivedStyle, 'pl-[55px]')}
                                    >
                                        {childItem.text} 
                                    </NavLink>
                                ))}
                            </div>   
                            }
                            
                        </div>}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default memo(AdminSidebar)