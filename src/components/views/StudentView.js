/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { 
  deleteStudentThunk
} from '../../store/thunks';
import "./StudentView.css";

const StudentView = (props) => {
  const { student } = props;
  console.log(student);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteStudentThunk(student.id));
    window.location.href = '/students';
  };
  // Render a single Student view 
  console.log(student)
  return (
    <div>
      <h1>Student</h1>
      <br/>
      <div id="student-info-container">
        {student.imageUrl === "" ? 
          <img className="student-img" src="https://cdn-icons-png.flaticon.com/512/904/904861.png" alt="student"></img> 
          :<img className="student-img" src={student.imageUrl} alt="student"></img>
        }
        <div id="student-info">
          <div className="student-info-line">
            <h2 style={{ margin: 0}}>First Name:</h2>
            <h3 style={{ margin: 0, lineHeight: 1.5, marginLeft: "10px" }}>{student.firstname}</h3>
          </div>
          <div className="student-info-line">
            <h2 style={{ margin: 0}}>Last Name: </h2>
            <h3 style={{ margin: 0, lineHeight: 1.5, marginLeft: "10px" }}>{student.lastname}</h3>
          </div>
          <div className="student-info-line">
            {student.campus === null ? <h2>No Campus</h2> :
              <div style={{display:"flex"}}>
                <h2 style={{ margin: 0, whiteSpace: "nowrap", cursor:"pointer"}}>Campus: </h2>
                <h3 style={{ margin: 0, lineHeight: 1.5, marginLeft: "10px", cursor:"pointer", color:"darkblue"}} onClick={() => window.location.href = `/campus/${student.campus.id}`}>{student.campus.name}</h3>
              </div>  
            }
          </div>
          <div className="student-info-line">
            <h2 style={{ margin: 0, whiteSpace: "nowrap", }}>Email:</h2>
            <h3 style={{ margin: 0, lineHeight: 1.5, marginLeft: "10px"}}>{student.email}</h3>
          </div>
          <div className="student-info-line">
            <h2 style={{ margin: 0, whiteSpace: "nowrap", }}>GPA:</h2>
            <h3 style={{ margin: 0, lineHeight: 1.5, marginLeft: "10px"}}>{student.gpa}</h3>
          </div>
        </div>
      </div>
      <div style={{display:"flex", margin:"auto", maxWidth:"20%", justifyContent:"space-evenly"}}>
        <Link to={`/student/${student.id}/edit`}>
          <button style={{border:"1px solid black", borderRadius:"3px", padding:"7px", fontFamily:"Roboto, sans-serif", fontSize:"14px", cursor:"pointer"}}>Edit Student</button>
        </Link>
        <button style={{backgroundColor:"red", color:"white", border:"1px solid black", borderRadius:"3px", padding:"7px", fontFamily:"Roboto, sans-serif", fontSize:"14px", cursor:"pointer"}} onClick={() => handleDelete()}>Delete Student</button>
      </div>
    </div>
  );

};

export default StudentView;