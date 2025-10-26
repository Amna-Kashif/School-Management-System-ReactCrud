import React, { useState, useEffect } from 'react';
import './Faculty.css'

const defaultTeachers = [
  {
    fullName: "Ms. Ayesha Khan",
    subjects: ["English Literature"],
    bio: "Ms. Ayesha inspires creativity through language, encouraging students to explore literature critically and empathetically.",
    image: "/teacher-ayesha.png",
  },
  {
    fullName: "Mr. Ahmed Raza",
    subjects: ["Mathematics"],
    bio: "With a passion for logic, Mr. Ahmed helps students build strong problem-solving skills using real-life examples.",
    image: "/teacher-ahmed.png",
  },
  {
    fullName: "Ms. Nida Sheikh",
    subjects: ["Science"],
    bio: "Mrs. Nida brings curiosity to the classroom, encouraging experimentation and hands-on learning experiences.",
    image: "/teacher-nida.png",
  },
];

const Faculty = () => {
  const initialForm = { fullName: '', subject: '', bio: '', image: '' };

  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('faculty'));
    if(stored && stored.length > 0) {
      setTeachers(stored);
    } else {
      setTeachers(defaultTeachers);
      localStorage.setItem('faculty', JSON.stringify(defaultTeachers))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('faculty', JSON.stringify(teachers));
  }, [teachers]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.subject || !form.bio) {
      alert("Please fill all required fields.");
      return;
    }

    const subjectsArray = form.subject.split(',').map(s => s.trim()).filter(Boolean);

    const newTeacher = {
      fullName: form.fullName,
      subjects: subjectsArray,
      bio: form.bio,
      image: form.image,
    };

    if (editIndex !== null) {
      const updated = [...teachers];
      updated[editIndex] = newTeacher;
      setTeachers(updated);
      setEditIndex(null);
    } else {
      setTeachers([...teachers, newTeacher]);
    }

    setForm(initialForm);
  };

  const handleEdit = (index) => {
    const t = teachers[index];
    setForm({
      fullName: t.fullName,
      subject: t.subjects.join(', '), 
      bio: t.bio,
      image: t.image,
    });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this teacher?")) {
      const updated = teachers.filter((_, i) => i !== index);
      setTeachers(updated);
    }
  };

  return (
    <section id="faculty" className="py-5 bg-white">
      <div className="container">
        <h2 className="text-center heading mb-4">Meet Our Faculty</h2>

        {/* ========= Form ========= */}
        <form className="p-4 mb-5 bg-light shadow rounded" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="fullName" className="form-label">Full Name *</label>
              <input type="text" className="form-control" id="fullName" value={form.fullName} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="subject" className="form-label">Subject *</label>
              <input type="text" className="form-control" id="subject" value={form.subject} onChange={handleChange} />
              <small className="form-text text-muted">Enter subjects separated by commas</small>
            </div>
            <div className="col-md-4">
              <label htmlFor="image" className="form-label">Image URL (optional)</label>
              <input type="text" className="form-control" id="image" value={form.image} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label htmlFor="bio" className="form-label">Short Bio *</label>
              <textarea className="form-control" id="bio" rows="2" value={form.bio} onChange={handleChange}></textarea>
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-warning px-5">
                {editIndex !== null ? 'Update' : 'Add'} Teacher
              </button>
            </div>
          </div>
        </form>

        {/* ========= Cards Section ========= */}
        <div className="row g-4 mb-5">
          {teachers.map((t, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card h-100 shadow-sm border-0 faculty-card text-center">
                <img
                  src={t.image || "https://media.istockphoto.com/id/1278974057/photo/student-raising-hand-in-classroom-at-the-high-school.jpg?s=612x612&w=0&k=20&c=TUWOBbtSyU-YL-hXU4pDniiEupMR3gM5deuNQLllTQk="}
                  className="card-img-top"
                  alt={t.fullName}
                  // style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{t.fullName}</h5>
                  <p className="text-warning mb-1"><strong>Subject:</strong> {t.subjects.join(', ')}</p>
                  <p className="card-text small flex-grow-1">{t.bio}</p>
                  <div className="d-flex justify-content-center gap-4 mt-3">
                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========= Faculty Table ========= */}
        <h4 className="mb-3">Faculty Table</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Subject(s)</th>
                <th>Bio</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length === 0 ? (
                <tr><td colSpan="6" className="text-muted">No faculty added yet.</td></tr>
              ) : (
                teachers.map((t, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{t.fullName}</td>
                    <td>{t.subjects.join(', ')}</td>
                    <td>{t.bio}</td>
                    <td>
                      <img src={t.image || "/images/placeholder.png"} alt="thumb" width="50" height="50" style={{ objectFit: 'cover' }} />
                    </td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2 mb-1" onClick={() => handleEdit(index)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Faculty;
