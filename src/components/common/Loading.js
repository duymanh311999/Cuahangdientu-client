import React, { memo } from 'react';
import {BeatLoader} from "react-spinners";

const Loading = () => {
    return(
           <BeatLoader
           color='#ee3131'/>
    )
}

export default memo(Loading)