import React, { useState, useEffect } from 'react';
import './Faculty.css';

const defaultTeachers = [
  {
    fullName: "Ms. Ayesha Khan",
    subjects: ["English Literature"],
    bio: "Ms. Ayesha Khan has over 10 years of experience teaching English Literature. She inspires creativity and critical thinking in her students through engaging lessons and interactive discussions.",
    image: "/teacher-ayesha.png",
  },
  {
    fullName: "Mr. Ahmed Raza",
    subjects: ["Mathematics"],
    bio: "Mr. Ahmed Raza is passionate about mathematics and problem-solving. With a decade of teaching experience, he makes complex concepts easy to understand and encourages analytical thinking.",
    image: "/teacher-ahmed.png",
  },
  {
    fullName: "Ms. Nida Sheikh",
    subjects: ["Science"],
    bio: "Ms. Nida Sheikh brings curiosity and enthusiasm to her science classes. She focuses on hands-on experiments and inquiry-based learning to help students explore and understand the world around them.",
    image: "/teacher-nida.png",
  },
];

const Faculty = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('faculty'));
    setTeachers(stored?.length ? stored : defaultTeachers);
  }, []);

  return (
    <section id="faculty" className="py-5 bg-white">
      <div className="container">
        <h2 className="text-center mb-4">Meet Our Faculty</h2>
        <div className="row g-4">
          {teachers.map((t, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="card h-100 shadow-sm text-center">
                <img src={t.image} alt={t.fullName} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{t.fullName}</h5>
                  <p><strong>Subjects:</strong> {t.subjects}</p>
                  <p className="small">{t.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faculty;
