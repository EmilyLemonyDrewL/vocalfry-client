import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileCard from '../../../components/Cards/ProfileCard';
import { getProfilesByCategory } from '../../../api/userData';
import { getSingleCategory } from '../../../api/categoryData';

const ProfilesByCatPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [catLabel, setCatLabel] = useState('');
  const router = useRouter();
  const { categoryId } = router.query;

  useEffect(() => {
    if (categoryId) {
      getProfilesByCategory(categoryId).then((data) => setProfiles(data));
      getSingleCategory(categoryId).then((category) => setCatLabel(category.label));
    }
  }, [categoryId]);

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <h4>Profiles in category: {catLabel || 'Loading...'}</h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <div key={`profile--${profile.id}`} className="profile-col">
              <ProfileCard
                id={profile.id}
                name={profile.name_seen_on_profile}
                location={profile.location}
                email={profile.email}
                onClick={() => router.push(`/profiles/${profile.id}`)}
              />
            </div>
          ))
        ) : (
          <p>No profiles found in this category</p>
        )}
      </div>
    </div>
  );
};

export default ProfilesByCatPage;
