import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProfile } from '../../../api/userData';
import ProfileForm from '../../../components/Forms/ProfileForm';

const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleProfile(id).then((data) => setProfile(data));
    }
  }, [id]);

  return profile ? <ProfileForm obj={profile} /> : <p>Loading...</p>;
};

export default EditProfile;
