import { useState } from 'react'

const UpdateFeatureForm = ({ features, backendURL, refreshFeatures }) => {
    const [featureID, setFeatureID] = useState('')
    const [featureName, setFeatureName] = useState('')
    const [featureDescription, setFeatureDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `${backendURL}/features`;
        try {
            const response = await fetch(url, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ featureID, featureName, featureDescription })
            });
            if (response.ok) {
                setFeatureID('')
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
        <h2>Update a Feature</h2>
        <form className='updateFeatureForm' onSubmit={handleSubmit}>
            <label htmlFor="update_feature_name">Feature to Update: </label>
            <select
                name="update_feature_name"
                id="update_feature_name"
                value={featureID}
                onChange={(e) => setFeatureID(e.target.value)}
            >
                <option value="">Select a Feature</option>
                {features.map((features) => (
                    <option key={features["Feature ID"]} value={features["Feature ID"]}>
                        {features["Feature ID"]} - {features["Feature Name"]}
                    </option>
                ))}
            </select>

            <label htmlFor="update_feature_name">Feature Name: </label>
            <input value={featureName} onChange={(e) => setFeatureName(e.target.value)}
                type="text"
                name="update_feature_name"
                id="update_feature_name"

            />

            <label htmlFor="update_feature_description">Feature Description: </label>
            <input value={featureDescription} onChange={(e) => setFeatureDescription(e.target.value)}
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