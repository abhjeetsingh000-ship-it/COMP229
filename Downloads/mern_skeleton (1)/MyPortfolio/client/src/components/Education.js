import React from 'react';

function Education() {
  const educationList = [
    {
      institution: "Centennial College",
      degree: "Diploma in AI Software Engineering",
      dates: "2026 - Present",
      details: "Studying Web Development, C#, Java, Linux Administration, and Artificial Intelligence."
    },
    {
      institution: "John G. Diefenbaker High School",
      degree: "High School Diploma",
      dates: "Graduated 2025",
      details: "Completed core academic curriculum focusing on computer science and math."
    }
  ];

  return (
    <div className="page-container">
      <h1>Education & Qualifications</h1>
      {educationList.map((edu, index) => (
        <div key={index} className="card" style={{ marginBottom: '15px' }}>
          <h3>{edu.degree}</h3>
          <p><strong>{edu.institution}</strong> | <em>{edu.dates}</em></p>
          <p>{edu.details}</p>
        </div>
      ))}
    </div>
  );
}

export default Education;