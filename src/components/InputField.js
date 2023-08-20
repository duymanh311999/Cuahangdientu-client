import React from 'react';

const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFields}) => {

    return(
        <div className='w-full flex flex-col relative mb-2' > 
            {value.trim() !== '' && 
                <label className='animate-slide-top-sm text-[12px] absolute top-[-1px] left-[12px] block bg-white px-1' 
                    html={nameKey}> {nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)} 
                </label>
            }
            <input 
            type={type || 'text' }
            className='px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic outline-none'
            placeholder={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
            value={value}
            onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))}
            onFocus={() => setInvalidFields([])}
            />
            {invalidFields?.some(item => item.name === nameKey) && 
                <small className='text-main font-[10px] italic'>{invalidFields.find(
                    item => item.name === nameKey)?.message}
                </small>
            }
            
        </div>
    )
}

export default InputField