import React, { memo } from 'react';
import clsx from 'clsx';

const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFields, style, fullWidth, placeholder, isHideLabel}) => {

    return(
        <div className={clsx('flex flex-col relative mb-2', fullWidth && 'w-full')} > 
            {!isHideLabel && value?.trim() !== '' && 
                <label className='animate-slide-top-sm text-[12px] absolute top-[-1px] left-[12px] block bg-white px-1' 
                    html={nameKey}> {nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)} 
                </label>
            }
            <input 
            type={type || 'text' }
            className={clsx('px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic outline-none', style)}
            placeholder={placeholder || nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
            value={value}
            onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))}
            onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {invalidFields?.some(item => item.name === nameKey) && 
                <small className='text-main font-[10px] italic'>{invalidFields.find(
                    item => item.name === nameKey)?.message}
                </small>
            }
            
        </div>
    )
}

export default memo(InputField)