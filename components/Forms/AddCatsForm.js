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
    getCategories().then(setCategories);

    getProfileCategories(profileId).then(setProfileCategories);
  }, [profileId]);

  const isCategorySelected = (categoryId) => profileCategories.some((pc) => pc.category.id === categoryId);

  const handleCatChange = (categoryId) => {
    if (isCategorySelected(categoryId)) {
      const profileCat = profileCategories.find((pc) => pc.category.id === categoryId);
      deleteProfileCat(profileCat.id).then(() => {
        setProfileCategories((prev) => prev.filter((pc) => pc.id !== profileCat.id));
        onUpdate();
      });
    } else {
      createProfileCat(profileId, categoryId).then((newProfileCategory) => {
        setProfileCategories((prev) => [...prev, newProfileCategory]);
        onUpdate();
      });
    }
  };

  const handleSubmit = () => {
    alert('Categories added successfully!');
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
      <Button className="add-job-btn" onClick={handleSubmit}>
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
