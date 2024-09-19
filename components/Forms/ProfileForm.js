import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { updateProfile, createProfile } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name_seen_on_profile: '',
  image_url: '',
  bio: '',
  location: '',
  above_18: false,
  work_remote: false,
  demo_reel_url: '',
  email: '',
  phone: '',
};

const ProfileForm = ({ obj }) => {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj && obj.id) {
      setFormInput({
        name_seen_on_profile: obj.name_seen_on_profile,
        image_url: obj.image_url,
        bio: obj.bio,
        location: obj.location,
        above_18: obj.above_18,
        work_remote: obj.work_remote,
        demo_reel_url: obj.demo_reel_url,
        email: obj.email,
        phone: obj.phone,
      });
    }
  }, [obj]);

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;
    if (type === 'checkbox') {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      userId: user.uid,
    };
    if (obj && obj.id) {
      updateProfile(payload, obj.id).then(() => router.push(`/Profile/${obj.id}`));
    } else {
      createProfile(payload).then((newProfile) => router.push(`/Profile/${newProfile.id}`));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <FloatingLabel controlId="FloatingInput1" label="Name seen on profile" className="mb-3">
          <p className="form-notes">This can be your stage/professional name. Whatever you want other users to see.</p>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name_seen_on_profile"
            value={formInput.name_seen_on_profile}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel controlId="FloatingInput2" label="Profile Image" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Image url"
            name="image_url"
            value={formInput.image_url}
            onChange={handleChange}
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel controlId="FloatingInput3" label="Bio" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Enter a bio"
            name="bio"
            value={formInput.bio}
            onChange={handleChange}
            style={{ height: '100px' }}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel controlId="FloatingInput4" label="Location" className="mb-3">
          <p className="form-notes">Be as descriptive as possible. If you are willing to work from anywhere, if you can only work from your home studio, etc...</p>
          <Form.Control
            type="text"
            placeholder="Location"
            name="location"
            value={formInput.location}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Are you above 18?"
          name="above_18"
          checked={formInput.above_18}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Can you work remote? Do you have a home studio?"
          name="work_remote"
          checked={formInput.work_remote}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel controlId="FloatingInput5" label="Demo Reel URL" className="mb-3">
          <p className="form-notes">Provide a link to your demo reel. The link MUST START WITH http:// or https:// in order for it to work. </p>
          <Form.Control
            type="text"
            placeholder="add your demo reel url"
            name="demo_reel_url"
            value={formInput.demo_reel_url}
            onChange={handleChange}
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel controlId="FloatingInput6" label="Email" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel controlId="FloatingInput7" label="phone" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Phone"
            name="phone"
            value={formInput.phone}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>

      <Button className="form-submit" type="submit">Submit</Button>
    </Form>
  );
};

ProfileForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name_seen_on_profile: PropTypes.string,
    image_url: PropTypes.string,
    bio: PropTypes.string,
    location: PropTypes.string,
    above_18: PropTypes.bool,
    work_remote: PropTypes.bool,
    demo_reel_url: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};

ProfileForm.defaultProps = {
  obj: initialState,
};

export default ProfileForm;
