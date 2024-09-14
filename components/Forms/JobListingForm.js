import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { updateJob, createJob } from '../../api/jobListingData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  title: '',
  description: '',
  location: '',
  company_website: '',
};

const JobListingForm = ({ obj }) => {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj && obj.id) {
      setFormInput({
        title: obj.title,
        description: obj.description,
        location: obj.location,
        company_website: obj.company_website,
      });
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      listerId: user.uid,
      listing_date: new Date().toISOString().split('T')[0],
    };
    if (obj && obj.id) {
      updateJob(payload, obj.id)
        .then(() => router.push('/Jobs/MyJobs'));
    } else {
      createJob(payload)
        .then(() => router.push('/Jobs/MyJobs'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingInput1" label="Job Title" className="mb-3">
            <p className="form-notes">Give the job listing a title so that it is easy to find</p>
            <Form.Control
              type="text"
              placeholder="Ex: Undisclosed Video Game Character for [studio name here]"
              name="title"
              value={formInput.title}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingInput2" label="Job Description" className="mb-3">
            <p className="form-notes">Give a description of the character or voice work that you are looking for, and it is highly encouraged that you add information about pay for this job. Check state laws for requirements.</p>
            <Form.Control
              as="textarea"
              placeholder="Describe the job"
              name="description"
              value={formInput.description}
              onChange={handleChange}
              style={{ height: '100px' }}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingInput3" label="Location" className="mb-3">
            <p className="form-notes">Be as descriptive as possible. You can add a studio name or let them know that they can work remote from anywhere</p>
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
          <FloatingLabel controlId="floatingInput3" label="Company Website" className="mb-3">
            <p className="form-notes">Provide a link to the application or company website</p>
            <Form.Control
              type="text"
              placeholder="url"
              name="company_website"
              value={formInput.company_website}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Button className="form-submit" type="submit">Submit</Button>
      </Form>
    </>
  );
};

JobListingForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    company_website: PropTypes.string,
  }),
};

JobListingForm.defaultProps = {
  obj: initialState,
};

export default JobListingForm;
