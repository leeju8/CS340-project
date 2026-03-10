const AddSubscriptionFeatureForm = ({ subscriptions, features, backendURL, refreshSubscriptions }) => {

    return (
        <>
        <h2>Link a SubscriptionFeature</h2>

        <form className='addSubscriptionFeatureForm'>
            <label htmlFor="add_subscription_feature_subscription_id">Subscription ID to Link: </label>
            <select
                name="update_subscription_feature_subscription_id"
                id="update_subscription_feature_subscription_id"
            >
                <option value="">Select a Subscription</option>
                {subscriptions.map((subscriptions) => (
                    <option key={subscriptions["Subscription ID"]} value={subscriptions["Subscription ID"]}>
                        {subscriptions["Subscription ID"]} - {subscriptions["Subscription Name"]}
                    </option>
                ))}
            </select>

            <label htmlFor="update_subscription_feature_feature_id">Feature ID to Link: </label>
            <select
                name="update_subscription_feature_feature_id"
                id="update_subscription_feature_feature_id"
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