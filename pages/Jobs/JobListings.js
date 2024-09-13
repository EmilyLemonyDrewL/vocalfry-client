import React, { useEffect, useState } from 'react';
import JobListingCard from '../../components/Cards/JobListingCard';
import { getJobs } from '../../api/jobListingData';
import { useAuth } from '../../utils/context/authContext';

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  const showJobs = () => {
    if (user?.uid) {
      getJobs(user.uid).then((data) => setJobs(data));
    }
  };

  useEffect(() => {
    showJobs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div
      className="container"
      style={{ marginTop: '40px' }}
    >
      <h4>View All Jobs</h4>
      {jobs.length === 0 ? (
        <p className="no-jobs">There are no jobs listed</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4">
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

export default JobListingsPage;
