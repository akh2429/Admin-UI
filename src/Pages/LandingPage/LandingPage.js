import React, { useEffect, useState } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import "./LandingPage.css";
import ReactPaginate from 'react-paginate';
import EditForm from '../../Components/EditComponent/EditComponent';
import "./LandingPage.css";
export default function LandingPage() {
    const [employeeData, setEmployeeData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [editData, setEditData] = useState({ id: "", name: "", email: "", role: "" });
    const [edit, setEdit] = useState(false);

    //////////////////////////////////////////////////////////////////////////////////////////////////////Data Fetching

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

    //////////////////////////////////////////////////////////////////////////////////////////////////////Pagination Logic
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const lastIndex = pageNumber * usersPerPage;
    const pageCount = Math.ceil(filteredData.length / usersPerPage)
    const displayUsers = filteredData.slice(lastIndex, lastIndex + usersPerPage).map((val) => {
        return (
            <tr key={val.id} className='h-12 border shadow-sm'>
                <td className='border'>
                    <input type="checkbox" name={val.name} checked={val?.isChecked || false} onChange={checkBoxChangeHandler} />
                </td>
                <td className='border'>{val.name}</td>
                <td className='border'>{val.email}</td>
                <td className='border'>{val.role}</td>
                <td className='border text-2xl'>
                    <div>
                        <button
                            className='text-blue-700'
                            onClick={() => handleEdit(val)} >
                            <FaRegEdit />
                        </button>
                        <button
                            className='text-red-600'
                            onClick={() => handleDelete(val.id)}  >
                            <MdDeleteForever />
                        </button>
                    </div>
                </td>
            </tr>
        )
    });
    function changePage({ selected }) {
        setPageNumber(selected);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////Search Logic

    function searchData(inputData) {
        const filtered = employeeData.filter((val) => {
            const nameMatch = val.name.toLowerCase().includes(inputData.SearchQuery);
            const emailMatch = val.email.toLowerCase().includes(inputData.SearchQuery);
            const roleMatch = val.role.toLowerCase().includes(inputData.SearchQuery);
            return nameMatch || emailMatch || roleMatch;
        });
        setFilteredData(filtered);
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Edit Logic
    function handleEdit(values) {
        setEdit(true);
        setEditData(values);
    };

    function editFormSubitHandler(e) {
        e.preventDefault();
        const editIndex = filteredData.findIndex(val => val.id === editData.id);
        filteredData.splice(editIndex, 1, editData);
        setEdit(false);
    };

    function editFormChangeHandler(e) {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////Delete Functionality
    function handleDelete(id) {
        const updatedData = filteredData.filter(val => val.id !== id);
        setFilteredData(updatedData);
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////Checkbox Functionality

    function checkBoxChangeHandler(e) {
        const { name, checked } = e.target;
        if (name === "selectAllCheckBoxes") {
            const updatedData = filteredData.map((values) => {
                if (filteredData.indexOf(values) >= lastIndex && filteredData.indexOf(values) < lastIndex + usersPerPage) {
                    return { ...values, isChecked: checked };
                }
                return values;
            });
            setFilteredData(updatedData);
        } else {
            const updatedData = filteredData.map((values) =>
                values.name === name ? { ...values, isChecked: checked } : values
            );
            setFilteredData(updatedData);
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////DeleteAll Functionality
    function deleteAllHandler() {
        const uncheckedBoxes = filteredData.filter((values) => values.isChecked !== true);
        setFilteredData(uncheckedBoxes);
    }
    return (
        <div className='m-2 gap-2 flex flex-col justify-start items-center'>
            <SearchBar getData={searchData} />
            {edit && (
                <EditForm
                    editData={editData}
                    setEditData={setEditData}
                    editFormSubitHandler={editFormSubitHandler}
                    editFormChangeHandler={editFormChangeHandler}
                    setEdit={setEdit}
                />
            )}
            <div className='w-full m-1'>
                {filteredData.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    <table className='w-full'>
                        <thead>
                            <tr className='h-12 shadow-md border'>
                                <th className='border'>
                                    <input type="checkbox" name='selectAllCheckBoxes' checked={!filteredData.some((user) => user?.isChecked !== true)} onChange={checkBoxChangeHandler} />
                                </th>
                                <th className='border'>Name</th>
                                <th className='border'>Email</th>
                                <th className='border'>Role</th>
                                <th className='border'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayUsers}
                        </tbody>
                    </table>
                )}
            </div>
            <div className='flex w-full justify-start border rounded-lg p-2 shadow-md '>
                <button
                    onClick={deleteAllHandler}
                    className='  h-max bg-white p-2 flex justify-center items-center rounded-b-2xl text-sm text-red-600 font-bold shadow-md border-2 border-black'>
                    DELETE ALL</button>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    className='flex gap-3 border-2 border-gray-800 rounded-lg p-2 bg-slate-200 shadow-md m-auto'
                    containerClassName='containerClass'
                    previousLinkClassName='previousClass'
                    nextLinkClassName='nextClass'
                    disabledClassName='disablesClass'
                    activeClassName='activeClass'
                />
            </div>
        </div>
    );
}
