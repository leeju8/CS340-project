import DeleteObjectForm from './DeleteObjectForm';

const TableRow = ({ rowObject, backendURL, refreshObject }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeleteObjectForm rowObject={rowObject} backendURL={backendURL} refreshObject={refreshObject} />
        </tr>
    );
};

export default TableRow;