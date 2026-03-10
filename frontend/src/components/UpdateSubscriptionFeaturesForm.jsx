import { useState } from 'react'

const UpdateSubscriptionFeatureForm = ({ subscriptions, features, backendURL, refreshSubscriptionFeatures }) => {
    const [oldSubscriptionID, setOldSubscriptionID] = useState('')
    const [oldFeatureID, setOldFeatureID] = useState('')
    const [newSubscriptionID, setNewSubscriptionID] = useState('')
    const [newFeatureID, setNewFeatureID] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `${backendURL}/subscriptions/features`;
        try {
            const response = await fetch(url, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldSubscriptionID, oldFeatureID, newSubscriptionID, newFeatureID })
            });
            if (response.ok) {
                setOldSubscriptionID('');
                setOldFeatureID('');
                setNewSubscriptionID('');
                setNewFeatureID('');
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
        <h2>Update a SubscriptionFeature</h2>

        <form className='updateSubscriptionFeatureForm' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="update_old_subscription_feature_subscription_id">Subscription ID to Update: </label>
                <select
                    name="update_old_subscription_feature_subscription_id"
                    id="update_old_subscription_feature_subscription_id"
                    value={oldSubscriptionID}
                    onChange={(e) => setOldSubscriptionID(e.target.value)}
                >
                    <option value="">Select a Subscription</option>
                    {subscriptions.map((subscriptions) => (
                        <option key={subscriptions["Subscription ID"]} value={subscriptions["Subscription ID"]}>
                            {subscriptions["Subscription ID"]} - {subscriptions["Subscription Name"]}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="update_old_subscription_feature_feature_id">Feature ID to Update: </label>
                <select
                    name="update_old_subscription_feature_feature_id"
                    id="update_old_subscription_feature_feature_id"
                    value={oldFeatureID}
                    onChange={(e) => setOldFeatureID(e.target.value)}
                >
                    <option value="">Select a Feature</option>
                    {features.map((features) => (
                        <option key={features["Feature ID"]} value={features["Feature ID"]}>
                            {features["Feature ID"]} - {features["Feature Name"]}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="update_new_subscription_feature_subscription_id">New Subscription ID: </label>
                <select
                    name="update_new_subscription_feature_subscription_id"
                    id="update_new_subscription_feature_subscription_id"
                    value={newSubscriptionID}
                    onChange={(e) => setNewSubscriptionID(e.target.value)}
                >
                    <option value="">Select a Subscription</option>
                    {subscriptions.map((subscriptions) => (
                        <option key={subscriptions["Subscription ID"]} value={subscriptions["Subscription ID"]}>
                            {subscriptions["Subscription ID"]} - {subscriptions["Subscription Name"]}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="update_new_subscription_feature_feature_id">New Feature ID: </label>
                <select
                    name="update_new_subscription_feature_feature_id"
                    id="update_new_subscription_feature_feature_id"
                    value={newFeatureID}
                    onChange={(e) => setNewFeatureID(e.target.value)}
                >
                    <option value="">Select a Feature</option>
                    {features.map((features) => (
                        <option key={features["Feature ID"]} value={features["Feature ID"]}>
                            {features["Feature ID"]} - {features["Feature Name"]}
                        </option>
                    ))}
                </select>
            </div>

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateSubscriptionFeatureForm;