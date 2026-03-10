import { useState } from 'react'

const AddSubscriptionFeatureForm = ({ subscriptions, features, backendURL, refreshSubscriptionFeatures }) => {
    const [subscriptionID, setSubscriptionID] = useState('')
    const [featureID, setFeatureID] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `${backendURL}/subscriptions/features`;
        try {
            const response = await fetch(url, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subscriptionID, featureID })
            });
            if (response.ok) {
                setSubscriptionID('');
                setFeatureID('')
                refreshSubscriptionFeatures();
            } else {
                alert('Create failed.');
            }
        } catch (err) {
            alert('Error creating object.');
        }
    }

    return (
        <>
        <h2>Link a SubscriptionFeature</h2>

        <form className='addSubscriptionFeatureForm' onSubmit={handleSubmit}>
            <label htmlFor="add_subscription_feature_subscription_id">Subscription ID to Link: </label>
            <select
                name="add_subscription_feature_subscription_id"
                id="add_subscription_feature_subscription_id"
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

            <label htmlFor="add_subscription_feature_feature_id">Feature ID to Link: </label>
            <select
                name="add_subscription_feature_feature_id"
                id="add_subscription_feature_feature_id"
                value={featureID}
                onChange={(e) => setFeatureID(e.target.value)}
            >
                <option value="">Select a Feature</option>
                {features.map((features) => (
                    <option key={features["Feature ID"]} value={features["Feature ID"]}>
                        {features["Feature ID"]} - {features["Feature Name"]}
                    </option>
                ))}
            </select>

            <input type="submit" />
        </form>
        </>
    );
};

export default AddSubscriptionFeatureForm;