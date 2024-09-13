import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const CategoryCard = ({
  label,
  onClick,
}) => (
  <Card className="text-center" id="category-card" onClick={onClick} style={{ cursor: 'pointer' }}>
    <Card.Body>
      <Card.Text>{label}</Card.Text>
    </Card.Body>
  </Card>
);

CategoryCard.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryCard;
