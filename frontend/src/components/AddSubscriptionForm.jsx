const AddSubscriptionForm = ({ subscriptions, backendURL, refreshSubscriptions }) => {

    return (
        <>
        <h2>Add a Subscription</h2>

        <form className='addSubscriptionForm'>
            <label htmlFor="add_subscription_name">Subscription Name: </label>
            <input
                type="text"
                name="add_subscription_name"
                id="add_subscription_name"
            />

            <label htmlFor="add_subscription_cost">Subscription Cost: </label>
            <input
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