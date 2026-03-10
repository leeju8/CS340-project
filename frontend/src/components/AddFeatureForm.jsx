import { useState } from 'react'

const AddFeatureForm = ({ features, backendURL, refreshFeatures }) => {
    const [featureName, setFeatureName] = useState('')
    const [featureDescription, setFeatureDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `${backendURL}/features`;
        try {
            const response = await fetch(url, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ featureName, featureDescription })
            });
            if (response.ok) {
                setFeatureName('');
                setFeatureDescription('')
                refreshFeatures();
            } else {
                alert('Create failed.');
            }
        } catch (err) {
            alert('Error creating object.');
        }
    }

    return (
        <>
        <h2>Add a Feature</h2>

        <form className='addFeatureForm' onSubmit={handleSubmit}>
            <label htmlFor="add_feature_name">Feature Name: </label>
            <input value={featureName} onChange={(e) => setFeatureName(e.target.value)}
                type="text"
                name="add_feature_name"
                id="add_feature_name"
            />

            <label htmlFor="add_feature_description">Feature Description: </label>
            <input value={featureDescription} onChange={(e) => setFeatureDescription(e.target.value)}
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