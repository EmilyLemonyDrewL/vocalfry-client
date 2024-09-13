import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const ProfileCard = ({
  id,
  name,
  location,
  email,
}) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/Profile/ProfilesByCategory/${id}`);
  };

  return (
    <Card className="text-left" id="profile-card">
      <Card.Body>
        <Card.Text className="pro-name">{name}</Card.Text>
        <Card.Text>Location: {location}</Card.Text>
        <Card.Text>Contact: {email}</Card.Text>
        <Button className="job-deets" onClick={handleViewDetails}>Details</Button>
      </Card.Body>
    </Card>
  );
};
ProfileCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ProfileCard;
