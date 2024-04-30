/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { useDispatch } from 'react-redux';
import { 
  deleteStudentThunk
} from '../../store/thunks';

const StudentView = (props) => {
  const { student } = props
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteStudentThunk(student.id));
    window.location.href = '/students';
  };
  const handleEdit = () => {
    console.log(student.id);
    window.location.href = `/student/${student.id}/edit`;
  }
  // Render a single Student view 
  console.log(student)
  return (
    <div>
      <h1>Student</h1>
      <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
        <div style={{display:"flex"}}>
          <h2 style={{ margin: 0}}>First Name:</h2>
          <h3 style={{ margin: 0, lineHeight: 1.5, marginLeft: "10px" }}>{student.firstname}</h3>
        </div>
        <br/>
        <div style={{display:"flex"}}>
          <h2 style={{ margin: 0}}>Last Name: </h2>
          <h3 style={{ margin: 0, lineHeight: 1.5, marginLeft: "10px" }}>{student.lastname}</h3>
        </div>
        <br/>
        <div style={{display:"flex"}}>
          {student.campus === null ? <h2>No Campus</h2> :
            <div style={{display:"flex"}}>
              <h2 style={{ margin: 0, whiteSpace: "nowrap"}}>Campus: </h2>
              <h3 style={{ margin: 0, lineHeight: 1.5, marginLeft: "10px" }}>{student.campus.name}</h3>
            </div>  
          }
        </div>
        <br/>
      </div>
      <div style={{display:"flex", margin:"auto", maxWidth:"10%", justifyContent:"space-evenly"}}>
        <button style={{border:"1px solid black", borderRadius:"3px", padding:"7px", fontFamily:"Roboto, sans-serif", fontSize:"14px", cursor:"pointer"}} onClick = {() => handleEdit()}>Edit</button>
        <button style={{backgroundColor:"red", color:"white", border:"1px solid black", borderRadius:"3px", padding:"7px", fontFamily:"Roboto, sans-serif", fontSize:"14px", cursor:"pointer"}} onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  );

};

export default StudentView;