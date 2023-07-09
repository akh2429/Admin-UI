import React, { useState } from 'react'


export default function SearchBar() {

    const [inputData, setInputData] = useState({ SearchQuery: "" });

    function changeHandler(e) {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    return (
        <div className='w-full' >
            <input
                name='SearchQuery'
                placeholder='Search Exployees by Name, Email or Role'
                className='  border-2 w-full h-12 font-bold shadow-md'
                value={inputData.SearchQuery}
                onChange={changeHandler} />
        </div>
    )
};
