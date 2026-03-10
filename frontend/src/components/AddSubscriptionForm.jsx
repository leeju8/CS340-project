import { useState } from 'react'

const AddSubscriptionForm = ({ subscriptions, backendURL, refreshSubscriptions }) => {
    const [subscriptionName, setSubscriptionName] = useState('')
    const [subscriptionCost, setSubscriptionCost] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `${backendURL}/subscriptions`;
        try {
            const response = await fetch(url, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subscriptionName, subscriptionCost })
            });
            if (response.ok) {
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
        <h2>Add a Subscription</h2>

        <form className='addSubscriptionForm' onSubmit={handleSubmit}>
            <label htmlFor="add_subscription_name">Subscription Name: </label>
            <input value={subscriptionName} onChange={(e) => setSubscriptionName(e.target.value)}
                type="text"
                name="add_subscription_name"
                id="add_subscription_name"
            />

            <label htmlFor="add_subscription_cost">Subscription Cost: </label>
            <input value={subscriptionCost} onChange={(e) => setSubscriptionCost(e.target.value)}
                type="text"
                name="add_subscription_name"
                id="add_subscription_name"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddSubscriptionForm;