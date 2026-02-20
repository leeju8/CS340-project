const UpdateFeatureForm = ({ features, backendURL, refreshSubscriptions }) => {

    return (
        <>
        <h2>Update a Feature</h2>
        <form className='updateFeatureForm'>
            <label htmlFor="update_feature_name">Feature to Update: </label>
            <select
                name="update_feature_name"
                id="update_feature_name"
            >
                <option value="">Select a Feature</option>
                {features.map((features) => (
                    <option key={features["Feature ID"]} value={features["Feature ID"]}>
                        {features["Feature ID"]} - {features["Feature Name"]}
                    </option>
                ))}
            </select>

            <label htmlFor="update_feature_name">Feature Name: </label>
            <input
                type="text"
                name="update_feature_name"
                id="update_feature_name"
            />

            <label htmlFor="update_feature_description">Feature Description: </label>
            <input
                type="text"
                name="update_feature_description"
                id="update_feature_description"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateFeatureForm;