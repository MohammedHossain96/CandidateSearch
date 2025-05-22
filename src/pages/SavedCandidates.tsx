import { Candidate } from "../interfaces/Candidate.interface";

const imgStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  margin: '0 auto',
  display: 'block',
}


const SavedCandidates = () => {
  // Pull saved candidates from local storage
  const savedCandidates: Candidate[] = JSON.parse(
    localStorage.getItem('savedCandidates') || '[]'
  );

  return (
    <>
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
          {savedCandidates.map((candidate: Candidate, idx: number) => (
            <tr key={idx}>
              <td>
                <img src={candidate.avatar_url} alt="avatar" style={imgStyle} />
              </td>
              <td>{candidate.login}</td>
              <td>{candidate.location || 'N/A'}</td>
              <td>{candidate.email || 'N/A'}</td>
              <td>{candidate.company || 'N/A'}</td>
              <td>{candidate.bio || 'N/A'}</td>
              {/* avatar_url, login, location, email, company, bio */}

              <td>
                <button
                  onClick={() => {
                    const updated = savedCandidates.filter((_: Candidate, i: number) => i !== idx);
                    localStorage.setItem('savedCandidates', JSON.stringify(updated));
                    window.location.reload();
                  }}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
