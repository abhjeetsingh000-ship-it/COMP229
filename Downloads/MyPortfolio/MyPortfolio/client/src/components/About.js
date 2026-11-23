import React from 'react';

function About() {
  return (
    <div className="page-container">
      <h1>About Me</h1>
      <h2>Abhijeet Singh</h2>
      <p>
        I am an AI Software Engineering student passionate about web technologies, full-stack development, and database architecture.
      </p>
      
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn">
        View Resume (PDF)
      </a>
    </div>
  );
}

export default About;