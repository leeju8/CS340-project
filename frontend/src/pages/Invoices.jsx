import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import AddInvoiceForm from '../components/AddInvoiceForm';
import UpdateInvoiceForm from '../components/UpdateInvoiceForm';


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
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {invoices.map((invoices, index) => (
                        <TableRow key={index} rowObject={invoices} backendURL={backendURL} refreshInvoices={getData}/>
                    ))}

                </tbody>
            </table>

            <AddInvoiceForm users={users} subscriptions={subscriptions} backendURL={backendURL} refreshInvoices={getData}/>
            <UpdateInvoiceForm invoices={invoices} users={users} subscriptions={subscriptions} backendURL={backendURL} refreshInvoices={getData}/>
        </>
    );

} export default Invoices;