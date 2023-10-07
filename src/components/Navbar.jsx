import React, {useContext} from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { usePageContext } from './PageContext';

const Navbar = () => {
  const { projectTitle } = usePageContext();
  const location = useLocation();
  const { currentUser, logout } = UserAuth();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const renderButtons = () => {
    if (location.pathname.includes('/project')) {
      return (
        <div>
          <Link to="/chat">
            <button className="btn btn-primary ml-2">Chat</button>
          </Link>
          <Link to={`/add-user/${projectTitle}`}>
            <button className="btn btn-primary ml-2">Add user</button>
          </Link>
        </div>
      );
    } else if (location.pathname.includes('/home')) {
      return (
        <Link to="/new-project">
          <button className="btn btn-primary">New Project</button>
        </Link>
      )
    }
    return null;
  };

  return (
    <div className="navbar fixed z-10 bg-neutral text-neutral-content">
      <div className="containerWrap flex justify-between">
        <Link to="/home">
          <button className="btn btn-ghost normal-case text-xl">ONYX</button>
        </Link>
        {currentUser ? (
          <div>
            {renderButtons()}
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Navbar;
