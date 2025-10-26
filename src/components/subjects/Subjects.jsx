import React from 'react';
import './Subjects.css';  

const subjectsData = [
  {
    title: 'Mathematics',
    description: 'Develop logical thinking and problem-solving skills through real-world applications and interactive learning.',
  },
  {
    title: 'Science',
    description: 'Explore the wonders of the physical and natural world through experiments, observations, and curiosity-driven lessons.',
  },
  {
    title: 'English Language',
    description: 'Build strong communication, grammar, and writing skills while nurturing a love for reading and expression.',
  },
  {
    title: 'Urdu',
    description: 'Preserve cultural roots through language, poetry, and literature, enhancing expression and identity.',
  },
  {
    title: 'Computer Science',
    description: 'Introduce students to coding, logical thinking, and modern technology tools through project-based learning.',
  },
  {
    title: 'Social Studies',
    description: 'Learn about history, geography, and society to better understand the world and your role within it.',
  },
];

const Subjects = () => {
  return (
    <section id="subjects" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center heading mb-5">Subjects We Offer</h2>
        <div className="row g-4">
          {subjectsData.map(({ title, description }, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 subject-card">
                <div className="card-body">
                  <h5 className="card-title fw-bold" style={{ color: '#fdb44a' }}>{title}</h5>
                  <p className="card-text text-secondary">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subjects;
