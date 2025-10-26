import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="footer-logo">
              <img src="/Bright-Edge-Logo2.webp" alt="Bright Edge Logo" style={{ height: 60 }} />
            </div>
            <h4 className="text-uppercase fw-bold" style={{ color: '#fdb44a' }}>
              Bright Edge School
            </h4>
            <p className="text-light small">
              Empowering young minds through academic excellence and character development. We aim to nurture future leaders with creativity, compassion, and resilience.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3" style={{ color: '#fdb44a' }}>
              Quick Links
            </h5>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-white text-decoration-none d-block mb-2">Home</a></li>
              <li><a href="#admission" className="text-white text-decoration-none d-block mb-2">Admission</a></li>
              <li><a href="#faculty" className="text-white text-decoration-none d-block mb-2">Faculty</a></li>
              <li><a href="#vision" className="text-white text-decoration-none d-block mb-2">Vision</a></li>
              <li><a href="#subjects" className="text-white text-decoration-none d-block">Subjects</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3" style={{ color: '#fdb44a' }}>
              Contact Us
            </h5>
            <p className="mb-1"><i className="bi bi-geo-alt-fill me-2 text-warning"></i>123 Bright Street, Karachi, PK</p>
            <p className="mb-1"><i className="bi bi-telephone-fill me-2 text-warning"></i>+92 300 1234567</p>
            <p><i className="bi bi-envelope-fill me-2 text-warning"></i>info@brightedge.edu.pk</p>

            <div className="mt-3">
              <a href="#" className="text-white me-3"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-instagram fs-5"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-twitter fs-5"></i></a>
              <a href="#" className="text-white"><i className="bi bi-linkedin fs-5"></i></a>
            </div>
          </div>

        </div>

        <hr className="text-secondary" />

        <div className="text-center small text-secondary">
          © 2025 Bright Edge School. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
