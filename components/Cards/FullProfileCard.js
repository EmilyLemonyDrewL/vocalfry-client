import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const FullProfileCard = ({
  id,
  name,
  bio,
  image,
  location,
  demoReel,
  email,
  phone,
  above18,
  workremote,
  userId,
  currentUser,
  profileCategories = [],
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
        <a className="company-link" href={demoReel} target="_blank" rel="noopener noreferrer"> Link to demo reel: {demoReel} </a>
        <Card.Text>
          Can you work remote? Do you have a home studio?
        </Card.Text>
        <Card.Text>{workremote ? 'Yes' : 'No'}</Card.Text>
        <Card.Text>
          Are you above 18?
        </Card.Text>
        <Card.Text>{above18 ? 'Yes' : 'No'}</Card.Text>

        <div style={{ marginTop: '20px' }}>
          <h5>Profile Categories</h5>
          {profileCategories.length > 0 ? (
            <ul>
              {profileCategories.map((category) => (
                <li key={category.id}>{category.category.label}</li>
              ))}
            </ul>
          ) : (
            <p>This user has not added any categories yet.</p>
          )}
        </div>
      </Card.Body>

      {userId === currentUser && (
        <Button className="job-card-btn" onClick={() => router.push(`/Profile/edit/${id}`)}>Edit Profile</Button>
      )}
    </Card>
  );
};
FullProfileCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  demoReel: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  above18: PropTypes.bool.isRequired,
  workremote: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  currentUser: PropTypes.number.isRequired,
  profileCategories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default FullProfileCard;
