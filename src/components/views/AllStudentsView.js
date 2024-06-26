/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import "./AllStudentsView.css";
const AllStudentsView = (props) => {
  console.log(props)
  const {students, deleteStudent} = props;
  // If there is no student, display a message
  if (!students.length) {
    return (
    <div>
      <p>There are no students.</p>
      <Link to={`newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
    );
  }
  const handleEdit = (id) => {
    window.location.href = `/student/${id}/edit`;
  }
  // If there is at least one student, render All Students view 
  return (
    <div>
      <h1>All Students</h1>
      <Link to={`/newstudent`}>
        <button className="add-student-button">Add New Student</button>
      </Link>
      <br/><br/>
      <div id="student-container">
      {students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id} className = "student">
              <Link to={`/student/${student.id}`} style={{ textDecoration: 'none' }}>
                <h2>{name}</h2>
              </Link>
              <div className="buttons-container">
              <button onClick = {() => handleEdit(student.id)}>Edit</button>
                <button id="student-delete-button" onClick={() => deleteStudent(student.id)}>Delete</button>
              </div>
            </div>
          );
        }
      )}
      </div>
      <br/>
    </div>
  );
};


export default AllStudentsView;