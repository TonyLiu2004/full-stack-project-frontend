/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import "./CampusView.css"
// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;
  const generalCampusImage = "https://cdn-icons-png.flaticon.com/512/904/904861.png";
  // Render a single Campus view with list of its students
  console.log(campus);
  return (
    <div style={{padding:"20px"}}>
      <h1 id="campus-view-title">{campus.name}</h1>
      {campus.imageurl === "" ? <img className="campus-view-image" src={generalCampusImage} alt="campus"></img> : <img className="campus-view-image" src={campus.imageurl} alt="campus"></img> }
      <div className="campus-view-info">
        <p id="campus-view-address">Address: {campus.address}</p>
        <p id="campus-view-description">{campus.description}</p>
      </div>
      {campus.students.length === 0 ? <h3>No students registered.</h3> : <h3>Students:</h3>}
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })}
    </div>
  );
};

export default CampusView;