import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // State to hold the current candidate object
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate);
  // State to hold all of the candidates
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  // State to hold the loading state
  const [loading, setLoading] = useState(true);
  // State to hold candidates index
  const [index, setIndex] = useState(0);
  // function to fetch candidates from the API
  const fetchCandidates = async () => {
    const data = await searchGithub();
    setCandidates(data);
    await fetchCandidate(data[index].login);
    setLoading(false);
  };
  // function to fetch a single candidate from the API
  const fetchCandidate = async (login : string) => {
    const data = await searchGithubUser(login);
    setCandidate(data);
  };
  // function to handle the next candidate button click (save to local storage if user clicks the save button)
  const handleNextCandidate = () => {
    if (index < candidates.length - 1) {
      // save to local storage under key 'savedCandidates' (should be an array of saved candidates)
      const savedCandidates = JSON.parse(
        localStorage.getItem('savedCandidates') || '[]'
      );

      localStorage.setItem(
        'savedCandidates',
        JSON.stringify([...savedCandidates, candidate])
      );
      // increment the index and fetch the next candidate
      // set the index to the next candidate
      // set the candidate to the next candidate
      setIndex(index + 1);
      fetchCandidate(candidates[index + 1].login);
    } else {
      setIndex(0);
      fetchCandidate(candidates[0].login);
    }
  };
  // function to handle next without saving
  const handleNextWithoutSaving = () => {
    if (index < candidates.length - 1) {
      // increment the index and fetch the next candidate
      // set the index to the next candidate
      // set the candidate to the next candidate
      setIndex(index + 1);
      fetchCandidate(candidates[index + 1].login);
    } else {
      setIndex(0);
      fetchCandidate(candidates[0].login);
    }
  };
  // function to handle the previous candidate button click
  const handlePrevCandidate = () => {
    if (index > 0) {
      setIndex(index - 1);
      fetchCandidate(candidates[index - 1].login);
    } else {
      setIndex(candidates.length - 1);
      fetchCandidate(candidates[candidates.length - 1].login);
    }
  }
  // useEffect to fetch candidates when the component mounts
  useEffect(() => {
    fetchCandidates();
  }
  , []);
  // useEffect to fetch the candidate when the index changes
  // useEffect(() => {
  //   fetchCandidate(candidates[index].login);
  // }
  // , [index]);
  return (
  <>
    <h1>CandidateSearch</h1>
    {/* Render the candidate */}
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <h2>{candidate.login}</h2>
        <img src={candidate.avatar_url} alt={candidate.login} />
        <p>{candidate.bio}</p>
        <p>{candidate.company}</p>
        <p>{candidate.location}</p>
        <p>{candidate.email}</p>
        <button onClick={handlePrevCandidate}>Previous</button>
        <button onClick={handleNextCandidate}>Save</button>
        <button onClick={handleNextWithoutSaving}>Next</button>
      </div>
    )}
    
  </>
  );
};

export default CandidateSearch;
