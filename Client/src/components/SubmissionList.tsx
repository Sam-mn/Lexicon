import { ReactElement } from 'react';
import { ISubmission } from '../utils';

interface SubmissionListProps {
  submissions: ISubmission[];
  onDownload: (submissionId: string) => void;
}

export function SubmissionList({
  submissions,
  onDownload,
}: SubmissionListProps): ReactElement {
  return (
    <div className='submission-list'>
      <h3>Inlämningsuppgifter</h3>
      {submissions.length === 0 ? (
        <p>Inga inlämningsuppgifter tillgängliga.</p>
      ) : (
        <ul>
          {submissions.map((submission) => (
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
