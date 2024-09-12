import PropTypes from 'prop-types';
import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const FullProfileCard = ({
  id,
  name,
  bio,
  image,
  location,
  email,
  phone,
  categories,
  above18,
  workremote,
}) => {
  const router = useRouter();

  return (
    <Card className="text-left" id="full-profile-card">
      <div style={{ textAlign: 'left' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="profile pic" style={{ borderRadius: '50%' }} width={200} height={200} />
      </div>
      <Card.Body>
        <Card.Text className="pro-name">{name}</Card.Text>
        <Card.Text className="pro-stuff">About me: {bio}</Card.Text>
        <Card.Text className="pro-stuff">Location: {location}</Card.Text>
        <Card.Text className="pro-stuff">Contact: {email}, {phone}</Card.Text>
        <Card.Text>
          Can you work remote? Do you have a home studio?
        </Card.Text>
        <Card.Text>{workremote ? 'Yes' : 'No'}</Card.Text>
        <Card.Text>
          Are you above 18?
        </Card.Text>
        <Card.Text>{above18 ? 'Yes' : 'No'}</Card.Text>

        {categories && categories.length > 0 && (
        <Card.Text>
          <strong>Categories:</strong>
          <ListGroup variant="flush">
            {categories.map((category) => (
              <ListGroup.Item key={category.id}>
                {category.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Text>
        )}
      </Card.Body>

      <Button className="job-card-btn" onClick={() => router.push(`/Profile/edit/${id}`)}>Edit Profile</Button>
    </Card>
  );
};
FullProfileCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  above18: PropTypes.bool.isRequired,
  workremote: PropTypes.bool.isRequired,
};

export default FullProfileCard;
