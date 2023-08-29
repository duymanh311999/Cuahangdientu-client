import React, { memo } from 'react';
import clsx from 'clsx';

const Seleact = ({label, options=[], register, errors, id, validate, style, fullWidth, defaultValue}) => {
    return(
        <div className='flex flex-col gap-2'>
            {label && <label htmlFor={id}>{label}</label>}
            <select defaultValue={defaultValue} className={clsx('form-select', fullWidth && 'w-full', style)} id={id} {...register(id, validate)}>
                <option value=''>---Chọn---</option>
                {options?.map(item => (
                  <option value={item.code}>{item.value}</option>
                ))}
            </select>
            {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default memo(Seleact)