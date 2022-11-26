import React, { useState } from "react";
import StudentDataService from "../services/StudentService";

const AddStudent = () => {
  const initialStudentState = {
    id: null,
    name: "",
    email: "",
    contact_number: "",
    DOB: "",
  };
  const [student, setStudent] = useState(initialStudentState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const saveStudent = () => {
    var data = {
      name: student.name,
      email: student.email,
      contact_number: student.contact_number,
      DOB: student.DOB,
    };

    StudentDataService.create(data)
      .then(response => {
        setStudent({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          contact_number: response.data.contact_number,
          DOB: response.data.DOB,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newStudent = () => {
    setStudent(initialStudentState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newStudent}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={student.name}
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
              value={student.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact_number">Contact Number</label>
            <input
              type="tel"
              className="form-control"
              id="contact_number"
              pattern="[0-9]{10}"
              name="contact_number"
              value={student.contact_number}
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
              value={student.DOB}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={saveStudent} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
