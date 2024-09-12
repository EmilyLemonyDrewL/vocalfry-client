import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { getProfileByUser } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';
import FullProfileCard from '../../components/Cards/FullProfileCard';

const MyProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const showProfile = () => {
    if (user?.uid) {
      getProfileByUser(user.uid).then((data) => {
        // Assuming 'data' is an array with a single profile object
        setProfile(data[0]);
      });
    }
  };

  useEffect(() => {
    showProfile();
  }, [user]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container" style={{ marginTop: '40px' }}>
      {profile ? (
        <FullProfileCard
          id={profile.id}
          name={profile.name_seen_on_profile}
          bio={profile.bio}
          image={profile.image_url}
          location={profile.location}
          email={profile.email}
          phone={profile.phone}
          workremote={profile.work_remote}
          above18={profile.above_18}
          categories={profile.profile_categories}
        />
      ) : (
        <div className="create-profile-container">
          <h4>You have not created a profile yet</h4>
          <Button className="add-job-btn" onClick={() => router.push('/Profile/new')}>
            Create Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
