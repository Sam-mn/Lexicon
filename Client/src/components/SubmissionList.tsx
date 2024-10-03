import { ReactElement } from 'react';
import { IArtifact } from '../utils';

interface SubmissionListProps {
  submissions: IArtifact[] | undefined;
  onDownload: (submissionId: string) => void;
}

export function SubmissionList({
  submissions,
  onDownload,
}: SubmissionListProps): ReactElement {
  return (
    <div className='submission-list'>
      <h2>Inlämningsuppgifter</h2>
      {submissions?.length === 0 ? (
        <p>Inga inlämningsuppgifter tillgängliga.</p>
      ) : (
        <ul>
          {submissions?.map((submission) => (
            <li key={submission.id}>
              <span> {submission.fileName} </span>
              <span>
                {' '}
                {new Date(submission.uploadTime).toLocaleDateString()}{' '}
              </span>

              <button onClick={() => onDownload(submission.id)}>
                {' '}
                Ladda ned{' '}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
