import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import StudentDataService from "../services/StudentService";

const Student = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialStudentState = {
    id: null,
    name: "",
    email: "",
    contact_number: "",
    DOB: "",
  };
  const [currentStudent, setCurrentStudent] = useState(initialStudentState);
  const [message, setMessage] = useState("");

  const getStudent = id => {
    StudentDataService.get(id)
      .then(response => {
        setCurrentStudent(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getStudent(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const updateStudent = () => {
    StudentDataService.update(currentStudent.id, currentStudent)
      .then(response => {
        console.log(response.data);
        setMessage("The student was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteStudent = () => {
    StudentDataService.remove(currentStudent.id)
      .then(response => {
        console.log(response.data);
        navigate("/students");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="student-details">
      {currentStudent ? (
        <div className="edit-form">
          <h4>Student Details</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentStudent.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentStudent.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact_number">Contact Number</label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                className="form-control"
                id="contact_number"
                name="contact_number"
                value={currentStudent.contact_number}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="DOB">DOB</label>
              <input
                type="date"
                className="form-control"
                id="DOB"
                name="DOB"
                value={currentStudent.DOB}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteStudent}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateStudent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Student...</p>
        </div>
      )}
    </div>
  );
};

export default Student;
