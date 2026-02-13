const UpdateSubscriptionFeatureForm = ({ subscriptions, features, backendURL, refreshSubscriptions }) => {

    return (
        <>
        <h2>Update a SubscriptionFeature</h2>

        <form className='updateSubscriptionFeatureForm'>
            <label htmlFor="update_subscription_feature_subscription_id">Subscription to Update: </label>
            <select
                name="update_subscription_feature_subscription_id"
                id="update_subscription_feature_subscription_id"
            >
                <option value="">Select a Subscription</option>
                {subscriptions.map((subscriptions) => (
                    <option key={subscriptions.subscriptionID} value={subscriptions.subscriptionID}>
                        {subscriptions.subscriptionID} - {subscriptions.subscriptionName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_subscription_feature_feature_id">Feature to Update: </label>
            <select
                name="update_subscription_feature_feature_id"
                id="update_subscription_feature_feature_id"
            >
                <option value="">Select a Feature</option>
                {features.map((features) => (
                    <option key={features.featureID} value={features.featureID}>
                        {features.featureID} - {features.featureName}
                    </option>
                ))}
            </select>

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateSubscriptionFeatureForm;