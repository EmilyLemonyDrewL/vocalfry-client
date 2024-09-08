import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const CategoryCard = ({
  label,
}) => (
  <Card className="text-center" id="category-card">
    <Card.Body>
      <Card.Text>{label}</Card.Text>
    </Card.Body>
  </Card>
);

CategoryCard.propTypes = {
  label: PropTypes.string.isRequired,
};

export default CategoryCard;
