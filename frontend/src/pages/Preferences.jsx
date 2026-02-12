import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import AddPreferenceForm from '../components/AddPreferenceForm';
import UpdatePreferenceForm from '../components/UpdatePreferenceForm';

function Preferences({ backendURL }) {

    const [preferences, setPreferences] = useState([]);
    const [users, setUsers] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/preferences');
            
            // Convert the response into JSON format
            const {preferences, users} = await response.json();
    
            setPreferences(preferences)
            setUsers(users)
            
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
            <h1>Preferences</h1>

            <table>
                <thead>
                    <tr>
                        {preferences.length > 0 && Object.keys(preferences[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {preferences.map((preferences, index) => (
                        <TableRow key={index} rowObject={preferences} backendURL={backendURL} refreshPreferences={getData}/>
                    ))}

                </tbody>
            </table>

            <AddPreferenceForm users={users} backendURL={backendURL} refreshPreferences={getData} />
            <UpdatePreferenceForm preferences={preferences} users={users} backendURL={backendURL} refreshPreferences={getData} />
        </>
    );

} export default Preferences;