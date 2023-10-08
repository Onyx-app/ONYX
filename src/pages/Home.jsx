import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = UserAuth();

  useEffect(() => {
    if(currentUser) {
      navigate("/home")
    }
  }, [currentUser]);

  return (
    <div>
      <div className="label">
        <div className="text-wrapper">ONYX</div>
      </div>
      <div className="content">
        <p>
          Explore consolidated open science initiatives
          <br />
          and engage in the discovery and collaboration
          <br />
          of open science projects
        </p>
        <button onClick={()=> navigate('/explore')} type="button" className="btn btn-explore-projects">
          <div className="text-wrapper">Explore Projects</div>
          <img className="vector" alt="Vector" src="./svg/vector-1.svg" />
        </button>
      </div>
    </div>
  );
};

export default Home;
