// TODO: Create an interface for the Candidate objects returned by the API
 // interface for the candidate object (should match the API response location, user, email, company, bio, avatar)
  interface Candidate {
    login: string | '';
    avatar_url: string | '';
    bio: string | null;
    company: string | null;
    location: string | null;
    email: string | null;
  }

  export type { Candidate };