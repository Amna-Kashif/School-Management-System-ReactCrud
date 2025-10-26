import React, { useState, useEffect } from 'react';

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
  const [candidates, setCandidates] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('candidates');
    if (stored) setCandidates(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

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

    if (editIndex !== null) {
      const updated = [...candidates];
      updated[editIndex] = formData;
      setCandidates(updated);
      setEditIndex(null);
    } else {
      setCandidates([...candidates, formData]);
    }

    setFormData(initialState);
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleEdit = (index) => {
    setFormData(candidates[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const updated = candidates.filter((_, i) => i !== index);
      setCandidates(updated);
    }
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
                    {editIndex !== null ? 'Update' : 'Submit'}
                  </button>
                </div>
              </div>
            </form>

            {submitted && (
            <div className="alert alert-success mt-3">Thank you for applying. Please prepare for your admission test. You will receive further information via email.</div>
            )}

          </div>

          <div className="col-md-5 my-4"> <img src="/form-img.jfif" alt="Admission Form" className="img-fluid rounded shadow" style={{ height: '100%', objectFit: 'cover' }} /> </div>
        </div>

        <div className="mt-5">
          <h3 className="mb-3">Applied Candidates</h3>
          {candidates.length === 0 ? (
            <p>No candidates have applied yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>DOB</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Grade</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{candidate.fullName}</td>
                      <td>{candidate.dob}</td>
                      <td>{candidate.email}</td>
                      <td>{candidate.contact}</td>
                      <td>{candidate.grade}</td>
                      <td>{candidate.address}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-md-2 me-xs-0 mb-md-0 mb-1" onClick={() => handleEdit(index)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default AdmissionForm;
