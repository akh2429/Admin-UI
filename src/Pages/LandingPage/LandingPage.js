import React, { useEffect, useState } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import "./LandingPage.css"

export default function LandingPage() {
    const [employeeData, setEmployeeData] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
                const json = await response.json();
                setEmployeeData(json);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className=' m-2 flex flex-col justify-start items-center'>
            <SearchBar />
            <div className='w-full m-2' >
                <table className='w-full' >
                    <thead >
                        <tr className='h-12 shadow-md border'>
                            <th className='border'  >
                                <input type="checkbox" />
                            </th>
                            <th className='border' >Name</th>
                            <th className='border' >Email</th>
                            <th className='border' >Role</th>
                            <th className='border' >Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {employeeData &&
                            employeeData.map((val) => (
                                <tr key={val.id} className='h-12 border shadow-sm'>
                                    <td className='border' >
                                        <input type="checkbox" />
                                    </td>
                                    <td className='border' >{val.name}</td>
                                    <td className='border' >{val.email}</td>
                                    <td className='border' >{val.role}</td>
                                    <td className='border text-2xl' >
                                        <button><FaRegEdit /></button>
                                        <button><MdDeleteForever /></button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
