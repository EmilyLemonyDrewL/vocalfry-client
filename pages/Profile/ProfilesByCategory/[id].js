import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import FullProfileCard from '../../../components/Cards/FullProfileCard';
import { getProfileCategories } from '../../../api/categoryData';
import { getProfileById } from '../../../api/userData';
import { useAuth } from '../../../utils/context/authContext';

const ProfileDetailPage = () => {
  const [profile, setProfile] = useState(null);
  const [profileCategories, setProfileCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      getProfileById(id).then((data) => {
        setProfile(data);
        if (data?.id) {
          getProfileCategories(data.id).then(setProfileCategories);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
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
          demoReel={profile.demo_reel_url}
          email={profile.email}
          phone={profile.phone}
          workremote={profile.work_remote}
          above18={profile.above_18}
          userId={profile.user.id}
          currentUser={user.id}
          profileCategories={profileCategories}
        />
      ) : (
        <div className="create-profile-container">
          <h4>Profile Not Found</h4>
        </div>
      )}
    </div>
  );
};

export default ProfileDetailPage;
