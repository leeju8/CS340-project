import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowNoDelete from '../components/TableRowNoDelete';


function Users({ backendURL }) {

    const [users, setUsers] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/users');
            
            // Convert the response into JSON format
            const {users, subscriptions} = await response.json();
    
            setUsers(users);
            setSubscriptions(subscriptions);
            
        } catch (error) {
          // If the API call fails, print the error to the console
          console.log(error);
        }

    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Users</h1>

            <table>
                <thead>
                    <tr>
                        {users.length > 0 && Object.keys(users[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {users.map((users, index) => (
                        <TableRowNoDelete key={index} rowObject={users} backendURL={backendURL} refreshObject={getData} tableName="Users"/>
                    ))}

                </tbody>
            </table>
            
        </>
    );

} export default Users;