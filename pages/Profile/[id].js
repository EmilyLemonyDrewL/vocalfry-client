import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { getProfileByUser } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';
import FullProfileCard from '../../components/Cards/FullProfileCard';
import AddCatsToProfileForm from '../../components/Forms/AddCatsForm';
import { getProfileCategories } from '../../api/categoryData';

const MyProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [profileCategories, setProfileCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  const showProfile = () => {
    if (user?.uid) {
      getProfileByUser(user.uid).then((data) => {
        const profileData = data[0] || null;
        setProfile(profileData);
        setLoading(false);

        if (profileData?.id) {
          getProfileCategories(profileData.id).then(setProfileCategories);
        }
      });
    }
  };

  const refreshPage = () => {
    if (profile?.id) {
      getProfileCategories(profile.id).then(setProfileCategories);
    }
  };

  useEffect(() => {
    showProfile();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container" style={{ marginTop: '40px' }}>
      {profile ? (
        <>
          <FullProfileCard
            id={profile.id}
            name={profile.name_seen_on_profile}
            bio={profile.bio}
            image={profile.image_url}
            location={profile.location}
            demoReel={profile.demo_reel_url}
            email={profile.email}
            phone={profile.phone}
            workremote={profile.work_remote}
            above18={profile.above_18}
            userId={profile.user.id}
            currentUser={user.id}
            profileCategories={profileCategories}
          />
          <AddCatsToProfileForm profileId={profile.id} onUpdate={refreshPage} />
        </>
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
