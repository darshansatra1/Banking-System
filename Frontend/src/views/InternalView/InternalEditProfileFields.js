import React, { useState } from 'react';

const ExternalEditProfileFields = ({ userData, onSave, onCancel, date }) => {
    const [editedUserData, setEditedUserData] = useState(userData);
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
    
        // Check if the field is the mobile phone field
        if (name === "phone_number") {
            // Check if the value is numeric
            if (/^[0-9]*$/.test(value) || value === '') {
                setEditedUserData({ ...editedUserData, [name]: value });
            }
        } else {
            // For other fields, update the state directly
            setEditedUserData({ ...editedUserData, [name]: value });
        }
    };
    
    

    const handleSave = () => {
        if (!/^[0-9]{10}$/.test(editedUserData.phone_number)) {
            setPhoneNumberError('Mobile number must be 10 digits');
            return;
        }
        onSave(editedUserData);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-lg mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                    <h3 className="text-2xl text-blue-600 font-bold text-center my-4">Edit Profile</h3>
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2 text-blue-300" htmlFor="user_name">User Name:</label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                type="text"
                                name="user_name"
                                value={editedUserData.user_name}
                               disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2 text-blue-300" htmlFor="address">Address:</label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                type="text"
                                name="address"
                                value={editedUserData.address}
                                onChange={handleFieldChange}
                            />
                        </div>

                        <div className="mb-4">
                                <label className="block text-sm font-bold mb-2 text-blue-300" htmlFor="date">Date of Birth:</label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    type="date"
                                    name="date"
                                    value={date} 
                                    disabled
                                />
                            </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2 text-blue-300" htmlFor="phone_number">Mobile Number:</label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                type="text"
                                name="phone_number"
                                value={editedUserData.phone_number}
                                onChange={handleFieldChange}
                            />
                            {phoneNumberError && <span className="text-red-500">{phoneNumberError}</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2 text-blue-300" htmlFor="email">Email:</label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                type="text"
                                name="email"
                                value={editedUserData.email}
                                disabled
                            />
                        </div>

                     

                    </div>
                    <div className="flex justify-center mt-6">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleSave}>Save</button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalEditProfileFields;
