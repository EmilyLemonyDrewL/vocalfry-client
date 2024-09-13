import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  getCategories, getProfileCategories, createProfileCat, deleteProfileCat,
} from '../../api/categoryData';

const AddCatsToProfileForm = ({ profileId, onUpdate }) => {
  const [categories, setCategories] = useState([]);
  const [profileCategories, setProfileCategories] = useState([]);

  useEffect(() => {
    // Fetch categories and profile categories on component mount
    getCategories()
      .then(setCategories)
      .catch((error) => console.error('Error fetching categories:', error));

    getProfileCategories(profileId)
      .then(setProfileCategories)
      .catch((error) => console.error('Error fetching profile categories:', error));
  }, [profileId]);

  const isCategorySelected = (categoryId) => profileCategories.some((pc) => pc.category.id === categoryId);

  const handleCatChange = (categoryId) => {
    const isSelected = isCategorySelected(categoryId);
    if (isSelected) {
      const profileCat = profileCategories.find((pc) => pc.category.id === categoryId);
      deleteProfileCat(profileCat.id) // Make sure profileCat.id is correct
        .then(() => {
          setProfileCategories((prev) => prev.filter((pc) => pc.id !== profileCat.id));
          onUpdate(); // Call the onUpdate callback to refresh the profile categories
        })
        .catch((error) => console.error('Error deleting category:', error));
    } else {
      createProfileCat(profileId, categoryId)
        .then((newProfileCategory) => {
          setProfileCategories((prev) => [...prev, newProfileCategory]);
          onUpdate(); // Call the onUpdate callback to refresh the profile categories
        })
        .catch((error) => console.error('Error creating category:', error));
    }
  };

  return (
    <div className="manage-cats-container" style={{ marginTop: '20px' }}>
      <h5>Manage Categories</h5>
      <p>Please only select categories for the job types that you have had experience with.</p>
      <Form>
        {categories.map((category) => (
          <Form.Check
            key={category.id}
            type="checkbox"
            label={category.label}
            checked={isCategorySelected(category.id)}
            onChange={() => handleCatChange(category.id)}
          />
        ))}
      </Form>
      {/* Remove handleSubmit if not needed */}
      <Button className="add-job-btn" onClick={() => alert('Categories updated successfully!')}>
        Save
      </Button>
    </div>
  );
};

AddCatsToProfileForm.propTypes = {
  profileId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AddCatsToProfileForm;
