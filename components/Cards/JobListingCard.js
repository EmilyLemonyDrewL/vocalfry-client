import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { deleteJob } from '../../api/jobListingData';

const JobListingCard = ({
  id,
  title,
  location,
  listerId,
  currentUser,
  onUpdate,
}) => {
  const router = useRouter();
  const deleteTheJob = () => {
    if (window.confirm('Are you sure that you want to delete this job?')) {
      deleteJob(id).then(() => onUpdate());
      router.push('/Jobs/MyJobs');
    }
  };

  return (
    <Card id="job-card">
      <Card.Body>
        <h3>{title}</h3>
        <h5 className="job-location">Location: {location}</h5>
        <Link href={`/Jobs/${id}`} passHref>
          <Button className="job-card-btn">Details</Button>
        </Link>
        {listerId === currentUser && (
          <>
            <Button className="job-card-btn" onClick={() => router.push(`/Jobs/edit/${id}`)}>Edit</Button>
            <Button className="job-card-btn" onClick={deleteTheJob}>Delete</Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

JobListingCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  listerId: PropTypes.number.isRequired,
  currentUser: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default JobListingCard;
