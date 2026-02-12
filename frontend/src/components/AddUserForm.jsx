const AddUserForm = ({ users, subscriptions, backendURL, refreshUsers }) => {

    return (
        <>
        <h2>Add a User</h2>

        <form className='addUserForm'>
            <label htmlFor="add_user_name">Name: </label>
            <input
                type="text"
                name="add_user_name"
                id="add_user_name"
            />

            <label htmlFor="add_user_email">Email: </label>
            <input
                type="text"
                name="add_user_email"
                id="add_user_email"
            />

            <label htmlFor="add_user_phone_number">Phone Number (Format: 000-000-0000): </label>
            <input
                type="tel"
                name="add_user_phone_number"
                id="add_user_phone_number"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />

            <label htmlFor="add_user_subscription">Subscription: </label>
            <select
                name="add_user_subscription"
                id="add_user_subscription"
            >
                <option value="">Select a Subscription</option>
                {subscriptions.map((subscriptions, index) => (
                    <option value={subscriptions.subscriptionID} key={index}>{subscriptions.subscriptionName}</option>
                ))}
            </select>

            <input type="submit" />
        </form>
        </>
    );
};

export default AddUserForm;