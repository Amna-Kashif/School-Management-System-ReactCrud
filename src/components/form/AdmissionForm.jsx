import React, { useState } from 'react';

const AdmissionForm = () => {
  const initialState = {
    fullName: '',
    dob: '',
    email: '',
    contact: '',
    grade: '',
    address: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['fullName', 'dob', 'email', 'contact', 'grade'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert('Please fill all required fields.');
        return;
      }
    }

    console.log('Form submitted:', formData);

    setFormData(initialState);
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="admission" className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-md-7">
            <h2 className="text-center mb-4">Admission Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name *</label>
                  <input type="text" className="form-control" id="fullName" value={formData.fullName} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="dob" className="form-label">Date of Birth *</label>
                  <input type="date" className="form-control" id="dob" value={formData.dob} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="contact" className="form-label">Contact Number *</label>
                  <input type="tel" className="form-control" id="contact" value={formData.contact} onChange={handleChange} />
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="grade" className="form-label">Grade Level Applying For *</label>
                  <select id="grade" className="form-select" value={formData.grade} onChange={handleChange}>
                    <option value="">Choose grade</option>
                    <option>Grade 1</option>
                    <option>Grade 2</option>
                    <option>Grade 3</option>
                    <option>Grade 4</option>
                    <option>Grade 5</option>
                  </select>
                </div>

                <div className="col-12 mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea className="form-control" id="address" rows="3" value={formData.address} onChange={handleChange}></textarea>
                </div>

                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-warning px-5">
                    Submit
                  </button>
                </div>
              </div>
            </form>

            {submitted && (
              <div className="alert alert-success mt-3">
                Thank you for applying. Please prepare for your admission test. You will receive further information via email.
              </div>
            )}
          </div>

          <div className="col-md-5 my-4">
            <img src="/form-img.jfif" alt="Admission Form" className="img-fluid rounded shadow" style={{ height: '100%', objectFit: 'cover' }} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdmissionForm;
