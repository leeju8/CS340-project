const TableRowNoDelete = ({ rowObject, backendURL, refreshObject }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
        </tr>
    );
};

export default TableRowNoDelete;