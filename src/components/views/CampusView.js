/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import "./CampusView.css"
// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, students, editStudent, deleteCampus} = props;
  const generalCampusImage = "https://cdn-icons-png.flaticon.com/512/904/904861.png";
  console.log(props);
  // Render a single Campus view with list of its students
  function checkImageUrlValidity(imageUrl) {
    const img = new Image();
    img.src = imageUrl;
    return img.complete && img.naturalWidth !== 0;
  }

  const handleDeleteCampus = (campusId) =>{
    deleteCampus(campusId)
    window.location.href = `/campuses`;
  }

  const handleUnenroll = async (student) => {
    let editedStudent = {
      firstname: student.firstname,
      lastname: student.lastname,
      campusId: null,
      campus: null,
      id: student.id,
      email: student.email,
      gpa: student.gpa,
      imageUrl: student.imageUrl
    };
    await editStudent(editedStudent);
  }
  
  return (
    <div style={{padding:"20px"}}>
      <h1 id="campus-view-title">{campus.name}</h1>
      {campus.imageurl === "" || !checkImageUrlValidity(campus.imageurl) ? 
        <img className="campus-view-image" src={generalCampusImage} alt="campus"></img> 
        : <img className="campus-view-image" src={campus.imageurl} alt="campus"></img> 
      }
      <div className="campus-view-info">
        <p id="campus-view-address">Address: {campus.address}</p>
        <p id="campus-view-description">{campus.description}</p>
      </div>

      <div id="campus-view-buttons-container">
        <Link to={`/EnrollStudent/${campus.id}`}>
          <button className="campus-view-button">Enroll New Student</button>
        </Link>
        <Link to={`/campus/${campus.id}/edit`}>
          <button className="campus-view-button">Edit Campus</button>
        </Link>
        <button style={{backgroundColor:"red", color:"white"}}className="campus-view-button" onClick={() =>handleDeleteCampus(campus.id)}>Delete Campus</button>
      </div>

      {students.length === 0 ? <h3>No students registered.</h3> : <h3>Students:</h3>}
      {students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div className="student-container" key={student.id}>
            <div className="student-link">
              <Link to={`/student/${student.id}`} style={{ textDecoration: 'none', color:"black" }}>
                <h2>{name}</h2>
                {/* {name.length > 30 ? `${name.substring(0, 30)}...` : name} */}
              </Link>  
            </div>
            <button className="deleteStudentButton" onClick={() => handleUnenroll(student)}>Unenroll Student</button>           
          </div>
        );
      })}
    </div>
  );
};

export default CampusView;