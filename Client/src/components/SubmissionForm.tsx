import { ReactElement, useState } from 'react';

interface SubmissionFormProps {
  onSubmit: (file: File, description: string) => void;
}

export function SubmissionForm({
  onSubmit,
}: SubmissionFormProps): ReactElement {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit(file, description);
      setFile(null);
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Beskrivning"
      />
      <button type="submit" disabled={!file}>
        Lämna in
      </button>
    </form>
  );
}
