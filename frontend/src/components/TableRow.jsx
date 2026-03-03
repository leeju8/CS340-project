import DeleteObjectForm from './DeleteObjectForm';

const TableRow = ({ rowObject, backendURL, refreshObject, tableName }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <DeleteObjectForm rowObject={rowObject} backendURL={backendURL} refreshObject={refreshObject} tableName={tableName}/>
        </tr>
    );
};

export default TableRow;