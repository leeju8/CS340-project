import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowNoDelete from '../components/TableRowNoDelete';


function Invoices({ backendURL }) {

    const [invoices, setInvoices] = useState([]);
    const [users, setUsers] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/invoices');
            
            // Convert the response into JSON format
            const {invoices, users, subscriptions} = await response.json();
    
            setInvoices(invoices);
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
            <h1>Invoices</h1>

            <table>
                <thead>
                    <tr>
                        {invoices.length > 0 && Object.keys(invoices[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {invoices.map((invoices, index) => (
                        <TableRowNoDelete key={index} rowObject={invoices} backendURL={backendURL} refreshObject={getData} tableName="Invoices"/>
                    ))}
                </tbody>
            </table>
        </>
    );

} export default Invoices;