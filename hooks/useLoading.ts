import React, {useLayoutEffect, useState } from 'react'

const useLoading = (defaultState: boolean = false) => {
    const [loading, setLoading] = useState(defaultState);
    const [minimize, setMinimize] = useState(false);

    const minimizeLoader = () => {
        setMinimize(true);
    }

    // Set minimize false when loading stops 
    useLayoutEffect(() => {
        if(!loading && minimize){
            setMinimize(false);
        }
    }, [minimize, loading])

    return {
        loading, 
        setLoading,
        minimize,
        minimizeLoader,
    };
}

export default useLoading;

