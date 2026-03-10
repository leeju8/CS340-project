import { useState } from 'react'

const UpdateSubscriptionForm = ({ subscriptions, backendURL, refreshSubscriptions }) => {
    const [subscriptionID, setSubscriptionID] = useState('')
    const [subscriptionName, setSubscriptionName] = useState('')
    const [subscriptionCost, setSubscriptionCost] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `${backendURL}/subscriptions`;
        try {
            const response = await fetch(url, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subscriptionID, subscriptionName, subscriptionCost })
            });
            if (response.ok) {
                setSubscriptionID('');
                setSubscriptionName('')
                setSubscriptionCost('');
                refreshSubscriptions();
            } else {
                alert('Create failed.');
            }
        } catch (err) {
            alert('Error creating object.');
        }
    }

    return (
        <>
        <h2>Update a Subscription</h2>
        <form className='updateSubscriptionForm' onSubmit={handleSubmit}>
            <label htmlFor="update_subscription_name">Subscription to Update: </label>
            <select
                name="update_subscription_name"
                id="update_subscription_name"
                value={subscriptionID}
                onChange={(e) => setSubscriptionID(e.target.value)}
            >
                <option value="">Select a Subscription</option>
                {subscriptions.map((subscriptions) => (
                    <option key={subscriptions["Subscription ID"]} value={subscriptions["Subscription ID"]}>
                        {subscriptions["Subscription ID"]} - {subscriptions["Subscription Name"]}
                    </option>
                ))}
            </select>

            <label htmlFor="update_subscription_name">Subscription Name: </label>
            <input value={subscriptionName} onChange={(e) => setSubscriptionName(e.target.value)}
                type="text"
                name="update_subscription_name"
                id="update_subscription_name"
            />

            <label htmlFor="update_subscription_cost">Subscription Cost: </label>
            <input value={subscriptionCost} onChange={(e) => setSubscriptionCost(e.target.value)}
                type="text"
                name="update_subscription_cost"
                id="update_subscription_cost"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateSubscriptionForm;