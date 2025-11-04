import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";


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

const Dashboard = () => {
  const navigate = useNavigate();

  const initialForm = { fullName: "", subject: "", bio: "", image: "" };
  const [students, setStudents] = useState([]);

  const [teachers, setTeachers] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("faculty"));
    return stored && stored.length > 0 ? stored : defaultTeachers
  });   

  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") navigate("/home");

    const storedCandidates = JSON.parse(localStorage.getItem("candidates")) || [];
    setStudents(storedCandidates);

    let storedTeachers = JSON.parse(localStorage.getItem("faculty"));

    if(!storedTeachers || storedTeachers.length === 0) {
        localStorage.setItem("faculty", JSON.stringify(defaultTeachers))
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("faculty", JSON.stringify(teachers));
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

    const subjectsArray = form.subject.split(",").map((s) => s.trim());
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
      subject: t.subjects.join(", "),
      bio: t.bio,
      image: t.image,
    });
    setEditIndex(index);
  };

  const handleDeleteTeacher = (index) => {
    if (window.confirm("Delete this Teacher?")) {
      const updated = teachers.filter((_, i) => i !== index);
      setTeachers(updated);
    }
  };

  const handleStudentStatus = (index, status) => {
    const updated = [...students];
    updated[index].status = status;
    setStudents(updated);

    const storedCandidates = JSON.parse(localStorage.getItem("candidates")) || [];
    storedCandidates[index].status = status;
    localStorage.setItem("candidates", JSON.stringify(storedCandidates));
  };

  const handleStudentDelete = (index) => {
    if (window.confirm("Delete this Student?")) {
      const updated = students.filter((_, i) => i !== index);
      setStudents(updated);

      const storedCandidates = JSON.parse(localStorage.getItem("candidates")) || [];
      storedCandidates.splice(index, 1);
      localStorage.setItem("candidates", JSON.stringify(storedCandidates));
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
    <Navbar />
    <div className="container my-5" style={{ paddingTop: "80px" }}>
      <div className="d-flex justify-content-between mx-md-5 mb-4">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Students Table */}
      <div className="card shadow mb-4 p-3">
        <h4>Students ({students.length})</h4>
        <table className="table table-hover table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{s.fullName}</td>
                <td>{s.email}</td>
                <td>{s.grade}</td>
                <td>{s.status || "Applied"}</td>
                <td>
                  <button className="btn btn-sm btn-success me-1" onClick={() => handleStudentStatus(i, "Accepted")}>
                    Accept
                  </button>
                  <button className="btn btn-sm btn-danger me-1" onClick={() => handleStudentStatus(i, "Rejected")}>
                    Reject
                  </button>
                  <button className="btn btn-sm btn-warning" onClick={() => handleStudentDelete(i)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Faculty Form */}
      <h2>Add Teachers</h2>
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
            <button type="submit" className="btn btn-warning px-5">{editIndex !== null ? "Update" : "Add"} Teacher</button>
          </div>
        </div>
      </form>

      {/* Faculty Table */}
      <div className="card shadow mb-4 p-3">
        <h4>Faculty ({teachers.length})</h4>
        <table className="table table-hover table-bordered mt-3" >
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Subjects</th>
              <th>Bio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{t.fullName}</td>
                <td>{t.subjects.join(", ")}</td>
                <td style={{whiteSpace: 'normal', wordBreak: 'break-word'}}>{t.bio}</td>
                <td>
                  <button className="btn btn-sm btn-success me-1 mb-md-0 mb-1" onClick={() => handleEdit(i)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTeacher(i)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
