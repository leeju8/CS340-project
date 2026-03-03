import React from 'react';

const DeleteObjectForm = ({ rowObject, backendURL, refreshObject, tableName }) => {
    // Helper to get the primary key name and value
    const getIdField = () => {
        // Try common primary key names
        const possibleKeys = ['userID', 'subscriptionID', 'featureID', 'settingID', 'invoiceID', 'id'];
        for (const key of possibleKeys) {
            if (rowObject[key] !== undefined && rowObject[key] !== null) {
                return { key, value: rowObject[key] };
            }
        }
        // Fallback: use first key
        const keys = Object.keys(rowObject);
        if (keys.length > 0) {
            return { key: keys[0], value: rowObject[keys[0]] };
        }
        return { key: null, value: null };
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const { value: id } = getIdField();
        if (!tableName || id === undefined || id === null || id === "") {
            alert(`Missing table name (${tableName}) or id (${id}) for deletion.`);
            return;
        }
        const url = `${backendURL}/delete?table=${tableName}&id=${id}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (response.ok) {
                refreshObject();
            } else {
                alert('Delete failed.');
            }
        } catch (err) {
            alert('Error deleting object.');
        }
    };

    return (
        <td>
            <form onSubmit={handleDelete}>
                <button type='submit'>
                    Delete
                </button>
            </form>
        </td>
    );
};

export default DeleteObjectForm;