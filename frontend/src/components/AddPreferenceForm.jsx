const AddPreferenceForm = ({ preferences, users, backendURL, refreshPreferences }) => {

    return (
        <>
        <h2>Add a Setting</h2>

        <form className='addPreferenceForm'>
            <label htmlFor="add_setting_user">User: </label>
            <select
                name="add_setting_user"
                id="add_setting_user"
            >
                <option value="">Select a User</option>
                {users.map((users, index) => (
                    <option value={users.userID} key={index}>{users.userName}</option>
                ))}
            </select>

            <label htmlFor="add_setting_name">Setting Name: </label>
            <input
                type="text"
                name="add_setting_name"
                id="add_setting_name"
            />

            <label htmlFor="add_setting_value">Setting Value: </label>
            <input
                type="text"
                name="add_setting_value"
                id="add_setting_value"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddPreferenceForm;