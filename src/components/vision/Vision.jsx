import React from 'react';

const Vision = () => {
  return (
    <section id="vision" className="py-5" style={{ backgroundColor: '#fdb44a', color: '#ffffff' }}>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-10">
            <div
              className="card border-0 shadow-lg"
              style={{ backgroundColor: '#ffffff', color: '#333333' }}>
              <div className="card-body p-5">
                <h2 className="card-title fw-bold mb-4" style={{ color: '#fdb44a', fontFamily: "'Roboto', sans-serif"}}> Our Vision </h2>
                <p className="card-text fs-5" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  At <strong>Bright Edge School</strong>, our vision is to empower students to become lifelong learners,
                  critical thinkers, and responsible global citizens. We aim to provide a nurturing and inclusive
                  environment where academic excellence meets character development. Our mission is to inspire
                  innovation, compassion, and resilience in every child we teach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
