import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleJob } from '../../api/jobListingData';

export default function ViewJob() {
  const [jobDetails, setJobDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleJob(id).then((jobData) => {
      setJobDetails(jobData);
    });
  }, [id]);

  return (
    <div className="job-deets">
      <div>
        <h3 className="job-title">
          {jobDetails.title}
        </h3>
        <h5>
          Location: {jobDetails.location}
        </h5>
        <h5>
          Description: {jobDetails.description}
        </h5>
        <a className="company-link" href={jobDetails.company_website} target="_blank" rel="noopener noreferrer">
          Link to company website/application: {jobDetails.company_website}
        </a>
        <h6>
          Date Posted: {jobDetails.listing_date}
        </h6>
      </div>
    </div>
  );
}
