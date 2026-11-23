import React from 'react';

function Services() {
  const serviceList = [
    { title: "General Programming", desc: "Building algorithms and object-oriented scripts in C#, Java, and Python." },
    { title: "Web Development", desc: "Creating modern, responsive user interfaces with HTML, CSS, and React." },
    { title: "Database Systems", desc: "Designing structured tables, relationships, and queries using SQL and MongoDB." }
  ];

  return (
    <div className="page-container">
      <h1>Services Offered</h1>
      <div className="grid">
        {serviceList.map((service, index) => (
          <div key={index} className="card">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;