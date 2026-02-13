const AddSubscriptionFeatureForm = ({ subscriptions, features, backendURL, refreshSubscriptions }) => {

    return (
        <>
        <h2>Link a SubscriptionFeature</h2>

        <form className='addSubscriptionFeatureForm'>
            <label htmlFor="add_subscription_feature_subscription_id">Subscription ID: </label>
            <input
                type="text"
                name="add_subscription_feature_subscription_id"
                id="add_subscription_feature_subscription_id"
            />

            <label htmlFor="add_subscription_feature_feature_id">Feature ID: </label>
            <input
                type="text"
                name="add_subscription_feature_feature_id"
                id="add_subscription_feature_feature_id"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddSubscriptionFeatureForm;