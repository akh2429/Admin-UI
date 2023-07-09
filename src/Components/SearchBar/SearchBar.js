import React, { useState } from 'react'


export default function SearchBar() {

    const [inputData, setInputData] = useState({ SearchQuery: "" });

    function changeHandler(e) {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    return (
        <div>
            <input
                name='SearchQuery'
                placeholder='Search Exployees by Name, Email or Role'
                className=' text-center border-2 w-full h-12 font-bold'
                value={inputData.SearchQuery}
                onChange={changeHandler} />
        </div>
    )
};
