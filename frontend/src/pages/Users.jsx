import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import AddUserForm from '../components/AddUserForm';
import UpdateUserForm from '../components/UpdateUserForm';


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
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((users, index) => (
                        <TableRow key={index} rowObject={users} backendURL={backendURL} refreshUsers={getData}/>
                    ))}

                </tbody>
            </table>
            
            <AddUserForm subscriptions={subscriptions} backendURL={backendURL} refreshUsers={getData} />
            <UpdateUserForm users ={users} subscriptions={subscriptions} backendURL={backendURL} refreshUsers={getData} />
        </>
    );

} export default Users;