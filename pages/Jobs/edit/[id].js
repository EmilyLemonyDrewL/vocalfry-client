import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleJob } from '../../../api/jobListingData';
import JobListingForm from '../../../components/Forms/JobListingForm';

const EditJob = () => {
  const [job, setJob] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleJob(id).then((data) => setJob(data));
    }
  }, [id]);

  return job ? <JobListingForm obj={job} /> : <p>Loading...</p>;
};

export default EditJob;
