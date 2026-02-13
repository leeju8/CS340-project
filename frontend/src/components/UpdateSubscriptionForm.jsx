const UpdateSubscriptionForm = ({ subscriptions, backendURL, refreshSubscriptions }) => {

    return (
        <>
        <h2>Update a Subscription</h2>
        <form className='updateSubscriptionForm'>
            <label htmlFor="update_subscription_name">Subscription to Update: </label>
            <select
                name="update_subscription_name"
                id="update_subscription_name"
            >
                <option value="">Select a Subscription</option>
                {subscriptions.map((subscriptions) => (
                    <option key={subscriptions.subscriptionID} value={subscriptions.subscriptionID}>
                        {subscriptions.subscriptionID} - {subscriptions.subscriptionName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_subscription_name">Subscription Name: </label>
            <input
                type="text"
                name="update_subscription_name"
                id="update_subscription_name"
            />

            <label htmlFor="update_subscription_cost">Subscription Cost: </label>
            <input
                type="text"
                name="update_subscription_name"
                id="update_subscription_name"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateSubscriptionForm;