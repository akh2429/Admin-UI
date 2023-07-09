import React, { useEffect, useState } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import "./LandingPage.css";

export default function LandingPage() {
    const [employeeData, setEmployeeData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [editData, setEditData] = useState({ name: "", email: "", role: "" });
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
                const json = await response.json();
                setEmployeeData(json);
                setFilteredData(json);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    function searchData(inputData) {
        const filtered = employeeData.filter((val) => {
            const nameMatch = val.name.toLowerCase().includes(inputData.SearchQuery);
            const emailMatch = val.email.toLowerCase().includes(inputData.SearchQuery);
            const roleMatch = val.role.toLowerCase().includes(inputData.SearchQuery);
            return nameMatch || emailMatch || roleMatch;
        });
        setFilteredData(filtered);
    };

    function handleEdit(values) {
        setEdit(true);
        setEditData(values);
    }

    return (
        <div className='m-2 gap-2 flex flex-col justify-start items-center'>
            <SearchBar getData={searchData} />
            <form className={edit ? "flex gap-4 items-center justify-center shadow-sm w-full border-2 p-2 " : 'hidden'} >
                <input className='border w-max' name='Name' value={editData.name} />
                <input className='border w-max ' name='Email' value={editData.email} />
                <input className='border w-max' name='Role' value={editData.role} />
                <button className=' hover:text-lg h-max bg-white p-2 flex justify-center items-center rounded-b-2xl text-red-600 font-extrabold shadow-md border-2 border-black' >UPDATE</button>
            </form>
            <div className='w-full m-1'>
                {filteredData.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    <table className='w-full'>
                        <thead>
                            <tr className='h-12 shadow-md border'>
                                <th className='border'>
                                    <input type="checkbox" />
                                </th>
                                <th className='border'>Name</th>
                                <th className='border'>Email</th>
                                <th className='border'>Role</th>
                                <th className='border'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((val) => (
                                <tr key={val.id} className='h-12 border shadow-sm'>
                                    <td className='border'>
                                        <input type="checkbox" />
                                    </td>
                                    <td className='border'>{val.name}</td>
                                    <td className='border'>{val.email}</td>
                                    <td className='border'>{val.role}</td>
                                    <td className='border text-2xl'>
                                        <button onClick={() => handleEdit(val)} ><FaRegEdit /></button>
                                        <button><MdDeleteForever /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
