import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import AddSubscriptionForm from '../components/AddSubscriptionForm';
import UpdateSubscriptionForm from '../components/UpdateSubscriptionForm';

import AddSubscriptionFeatureForm from '../components/AddSubscriptionFeaturesForm';
import UpdateSubscriptionFeatureForm from '../components/UpdateSubscriptionFeaturesForm';

import AddFeatureForm from '../components/AddFeatureForm';
import UpdateFeatureForm from '../components/UpdateFeatureForm';


function Subscriptions({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    const [subscriptions, setSubscriptions] = useState([])
    const [subscriptionFeatures, setSubscriptionFeatures] = useState([])
    const [features, setFeatures] = useState([])


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/subscriptions');
            
            // Convert the response into JSON format
            const {subscriptions, subscriptionFeatures, features} = await response.json();
    
            setSubscriptions(subscriptions)
            setSubscriptionFeatures(subscriptionFeatures)
            setFeatures(features)
            
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
            <div style={{ display: "flex", gap: "20px" }}>
                <div>
                    <h1>Subscriptions</h1>
                    
                    <table>
                        <thead>
                            <tr>
                                {subscriptions.length > 0 && Object.keys(subscriptions[0]).map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {subscriptions.map((subscriptions, index) => (
                                <TableRow key={index} rowObject={subscriptions} backendURL={backendURL} refreshSubscriptions={getData}/>
                            ))}

                        </tbody>
                    </table>

                     <AddSubscriptionForm subscriptions={subscriptions} backendURL={backendURL} refreshSubscriptions={getData} />
                     <UpdateSubscriptionForm subscriptions={subscriptions} backendURL={backendURL} refreshSubscriptions={getData} />

                </div>

                <div>
                    <h1>SubscriptionFeatures</h1>

                    <table>
                        <thead>
                            <tr>
                                {subscriptionFeatures.length > 0 && Object.keys(subscriptionFeatures[0]).map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {subscriptionFeatures.map((subscriptionFeatures, index) => (
                                <TableRow key={index} rowObject={subscriptionFeatures} backendURL={backendURL} refreshSubscriptions={getData}/>
                            ))}

                        </tbody>
                    </table>

                    <AddSubscriptionFeatureForm subscriptions={subscriptions} features={features} backendURL={backendURL} refreshSubscriptions={getData} />
                    <UpdateSubscriptionFeatureForm subscriptions={subscriptions} features={features} backendURL={backendURL} refreshSubscriptions={getData} />

                </div>

                <div>
                    <h1>Features</h1>

                    <table>
                        <thead>
                            <tr>
                                {features.length > 0 && Object.keys(features[0]).map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {features.map((features, index) => (
                                <TableRow key={index} rowObject={features} backendURL={backendURL} refreshSubscriptions={getData}/>
                            ))}

                        </tbody>
                    </table>

                    <AddFeatureForm features={features} backendURL={backendURL} refreshSubscriptions={getData} />
                    <UpdateFeatureForm features={features} backendURL={backendURL} refreshSubscriptions={getData} />

                </div>

            </div>

            
        </>
    );

} export default Subscriptions;