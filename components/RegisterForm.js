import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    uid: user.uid,
    user_type: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure that your information is correct?');
    if (isConfirmed) {
      registerUser(formData).then(() => updateUser(user.uid));
    }
  };

  return (
    <div>
      <p>Please enter your real first and last name. You will have the chance to add your professional/stage name after registration</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            required
            placeholder="Enter your first name"
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            required
            placeholder="Enter your last name"
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fromUserType">
          <Form.Label>User Type</Form.Label>
          <Form.Check
            type="radio"
            label="Voice Actor"
            name="user_type"
            value={0}
            checked={formData.user_type === 0}
            onChange={() => setFormData((prev) => ({ ...prev, user_type: 0 }))}
          />
          <Form.Check
            type="radio"
            label="Hiring Company"
            name="user_type"
            value={1}
            checked={formData.user_type === 1}
            onChange={() => setFormData((prev) => ({ ...prev, user_type: 1 }))}
          />

          <Button variant="warning" type="submit">
            submit
          </Button>

        </Form.Group>
      </Form>
    </div>

  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
