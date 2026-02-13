const AddFeatureForm = ({ features, backendURL, refreshSubscriptions }) => {

    return (
        <>
        <h2>Add a Feature</h2>

        <form className='addFeatureForm'>
            <label htmlFor="add_feature_name">Feature Name: </label>
            <input
                type="text"
                name="add_feature_name"
                id="add_feature_name"
            />

            <label htmlFor="add_feature_description">Feature Description: </label>
            <input
                type="text"
                name="add_feature_description"
                id="add_feature_description"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default AddFeatureForm;