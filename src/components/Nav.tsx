import { Link, useLocation} from 'react-router-dom';

const Nav = () => {
   const currentPage = useLocation().pathname;
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      {/* Nav with a link to an href "/SavedCandidates" */}
      <nav>
        <ul>
        
          <li>
            <a href="/">Find Candidates</a>
          </li>
          <li>
                        <Link
              to='/SavedCandidates'
              className={
                currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'
              }
            >
              Saved Candidates
            </Link>
            </li>
        </ul>
      </nav>
    </div>
    
  )
};

export default Nav;
