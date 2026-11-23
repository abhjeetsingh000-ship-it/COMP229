import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-container">
      <h1>Welcome to My Personal Portfolio</h1>
      <p>Hello! Welcome to my web application development portfolio.</p>
      
      <h3>Mission Statement</h3>
      <p>My goal is to develop efficient software solutions, learn modern web frameworks, and craft clean user interfaces.</p>
      
      <Link to="/about" className="btn">Learn More About Me</Link>
    </div>
  );
}

export default Home;