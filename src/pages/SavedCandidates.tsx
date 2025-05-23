import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const imgStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  margin: '0 auto',
  display: 'block',
};

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('savedCandidates');
    if (stored) {
      setCandidates(JSON.parse(stored));
    }
  }, []);

  const handleReject = (index: number) => {
    const updated = candidates.filter((_, i) => i !== index);
    setCandidates(updated);
    localStorage.setItem('savedCandidates', JSON.stringify(updated));
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((candidate, idx) => (
              <tr key={candidate.login + idx}>
                <td>
                  <img src={candidate.avatar_url} alt="avatar" style={imgStyle} />
                </td>
                <td>{candidate.login}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>{candidate.bio || 'N/A'}</td>
                <td>
                  <button onClick={() => handleReject(idx)}>Reject</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No saved candidates.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;