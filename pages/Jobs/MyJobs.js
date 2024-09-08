import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import JobListingCard from '../../components/Cards/JobListingCard';
import { getJobByUser } from '../../api/jobListingData';
import { useAuth } from '../../utils/context/authContext';

const MyJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const showJobs = () => {
    if (user?.uid) {
      getJobByUser(user.uid).then((data) => setJobs(data));
    }
  };

  useEffect(() => {
    showJobs();
  }, [user]);

  const handleAddJob = () => {
    router.push('/Jobs/new');
  };

  return (
    <div
      className="container"
      style={{ marginTop: '40px' }}
    >
      <h4>Manage Your Job Listings</h4>
      <Button className="add-job-btn" onClick={handleAddJob}>Add A Job</Button>
      {jobs.length === 0 ? (
        <p className="no-jobs">You have not listed any jobs yet</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {jobs.map((job) => (
            <div key={`job--${job.id}`} className="job-col">
              <JobListingCard
                id={job.id}
                title={job.title}
                location={job.location}
                listerId={job.lister.id}
                currentUser={user.id}
                onUpdate={showJobs}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobsPage;
