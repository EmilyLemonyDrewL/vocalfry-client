import PropTypes from 'prop-types';
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const ProfileCard = ({
  name,
  location,
  email,
  categories,
}) => (
  <Card className="text-center" id="category-card">
    <Card.Body>
      <Card.Text>{name}</Card.Text>
      <Card.Text>Location: {location}</Card.Text>
      <Card.Text>Contact: {email}</Card.Text>
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
    </Card.Body>
  </Card>
);

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default ProfileCard;
