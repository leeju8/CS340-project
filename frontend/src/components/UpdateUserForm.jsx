const UpdateUserForm = ({ users, subscriptions, backendURL, refreshUsers }) => {

    return (
        <>
        <h2>Update a User</h2>
        <form className='userUpdateForm'>
            <label htmlFor="update_user_id">User to Update: </label>
            <select
                name="update_user_id"
                id="update_user_id"
            >
                <option value="">Select a User</option>
                {users.map((users) => (
                    <option key={users["User ID"]} value={users["User ID"]}>
                        {users["User ID"]} - {users["User Name"]}
                    </option>
                ))}
            </select>

            <label htmlFor="update_user_name">Name: </label>
            <input
                type="text"
                name="update_user_name"
                id="update_user_name"
            />

            <label htmlFor="update_user_email">Email: </label>
            <input
                type="text"
                name="update_user_email"
                id="update_user_email"
            />

            <label htmlFor="update_user_phone_number">Phone Number (Format: 000-000-0000): </label>
            <input
                type="tel"
                name="update_user_phone_number"
                id="update_user_phone_number"
                 pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />

            <label htmlFor="update_user_subscription">Subscription: </label>
            <select
                name="update_user_subscription"
                id="update_user_subscription"
            >
                <option value="">Select a Subscription</option>
                {subscriptions.map((subscriptions) => (
                    <option key={subscriptions["Subscription ID"]} value={subscriptions["Subscription ID"]}>
                        {subscriptions["Subscription Name"]}
                    </option>
                ))}
            </select>

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateUserForm;