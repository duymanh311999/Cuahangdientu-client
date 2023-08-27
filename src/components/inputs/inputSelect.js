import React, { memo } from 'react';

const InputSelect = ({value, changeValue, options}) => {
    return(
       <select className='form-select text-sm' value={value} onChange={e => changeValue(e.target.value)}>
        <option value=''>Mặc định</option>
            {options && options.map(item => (
                <option key={item.id} value={item.value}>{item.text}</option>
            ))}
       </select>
    )
}

export default memo(InputSelect)