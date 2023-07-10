import React from 'react';

export default function EditForm({ editData, setEditData, editFormSubitHandler, editFormChangeHandler, setEdit }) {
    return (
        <form
            className="flex flex-col gap-4 items-center justify-center shadow-sm w-full border-2 p-2"
            onSubmit={editFormSubitHandler}
        >
            <span>Edit Details Here</span>
            <input
                className="border w-1/2"
                name="name"
                value={editData.name}
                onChange={editFormChangeHandler}
            />
            <input
                className="border w-1/2"
                name="email"
                value={editData.email}
                onChange={editFormChangeHandler}
            />
            <input
                className="border w-1/2"
                name="role"
                value={editData.role}
                onChange={editFormChangeHandler}
            />

            <div className="flex gap-2">
                <button
                    className="hover:text-lg h-max bg-white p-2 flex justify-center items-center rounded-b-2xl text-red-600 font-extrabold shadow-md border-2 border-black"
                >
                    UPDATE
                </button>
                <button
                    onClick={() => setEdit(false)}
                    className="hover:text-lg h-max bg-white p-2 flex justify-center items-center rounded-b-2xl text-red-600 font-extrabold shadow-md border-2 border-black"
                >
                    CANCEL
                </button>
            </div>
        </form>
    );
}
