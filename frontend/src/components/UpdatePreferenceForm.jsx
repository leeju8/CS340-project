const UpdatePreferenceForm = ({ preferences, users, backendURL, refreshPreferences }) => {

    return (
        <>
        <h2>Update a Setting</h2>
        <form className='updatePreferenceForm'>
            <label htmlFor="update_setting_id">Setting to Update: </label>
            <select
                name="update_setting_id"
                id="update_setting_id"
            >
                <option value="">Select a Setting</option>
                {preferences.map((preferences) => (
                    <option key={preferences["Setting ID"]} value={preferences["Setting ID"]}>
                        {preferences["Setting ID"]} - {preferences["Setting Name"]}
                    </option>
                ))}
            </select>

            <label htmlFor="update_setting_name">Name: </label>
            <input
                type="text"
                name="update_setting_name"
                id="update_setting_name"
            />

            <label htmlFor="update_setting_value">Value: </label>
            <input
                type="text"
                name="update_setting_value"
                id="update_setting_value"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdatePreferenceForm;