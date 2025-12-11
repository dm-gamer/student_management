import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [department, setDepartment] = useState('');
  const [batch, setBatch] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/students', {
      headers: { 'x-auth-token': token },
    });
    setStudents(res.data);
  };

  const addOrUpdateStudent = async () => {
    const token = localStorage.getItem('token');
    if (name && age && grade && department && batch) {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/students/${editingId}`,
          { name, age, grade, department, batch },
          { headers: { 'x-auth-token': token } }
        );
        setEditingId(null);
      } else {
        await axios.post(
          'http://localhost:5000/api/students',
          { name, age, grade, department, batch },
          { headers: { 'x-auth-token': token } }
        );
      }
      clearForm();
      fetchStudents();
    } else {
      alert('Please fill all fields');
    }
  };

  const deleteStudent = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/students/${id}`, {
      headers: { 'x-auth-token': token },
    });
    fetchStudents();
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
    setDepartment(student.department);
    setBatch(student.batch);
  };

  const clearForm = () => {
    setEditingId(null);
    setName('');
    setAge('');
    setGrade('');
    setDepartment('');
    setBatch('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Students Dashboard</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Batch" value={batch} onChange={(e) => setBatch(e.target.value)} style={inputStyle} />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={addOrUpdateStudent} style={{ padding: '10px', borderRadius: '5px', backgroundColor: editingId ? '#f39c12' : '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
            {editingId ? 'Update Student' : 'Add Student'}
          </button>
          {editingId && (
            <button onClick={clearForm} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer' }}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f9' }}>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Age</th>
            <th style={tableHeaderStyle}>Grade</th>
            <th style={tableHeaderStyle}>Department</th>
            <th style={tableHeaderStyle}>Batch</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td style={tableCellStyle}>{student.name}</td>
              <td style={tableCellStyle}>{student.age}</td>
              <td style={tableCellStyle}>{student.grade}</td>
              <td style={tableCellStyle}>{student.department}</td>
              <td style={tableCellStyle}>{student.batch}</td>
              <td style={tableCellStyle}>
                <button onClick={() => editStudent(student)} style={updateButtonStyle}>Update</button>
                <button onClick={() => deleteStudent(student._id)} style={deleteButtonStyle}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' };
const tableHeaderStyle = { padding: '10px', borderBottom: '2px solid #ccc', textAlign: 'left' };
const tableCellStyle = { padding: '10px', borderBottom: '1px solid #ccc' };
const updateButtonStyle = { padding: '5px 10px', borderRadius: '5px', backgroundColor: '#f39c12', color: 'white', border: 'none', cursor: 'pointer', marginRight: '5px' };
const deleteButtonStyle = { padding: '5px 10px', borderRadius: '5px', backgroundColor: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer' };

export default Students;
