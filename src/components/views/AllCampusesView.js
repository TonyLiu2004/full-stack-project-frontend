/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./AllCampusesView.css";
const AllCampusesView = (props) => {
  const {deleteCampus} = props;
  console.log(props);
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return <div>
      <br/>
      There are no campuses.
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
    </div>;
  }
  function checkImageUrlValidity(imageUrl) {
    const img = new Image();
    img.src = imageUrl;
    return img.complete && img.naturalWidth !== 0;
  }

  const handleEdit = (id) => {
    window.location.href = `/campus/${id}/edit`;
  }
  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>

      <div id="campus-container">
        {props.allCampuses.map((campus) => (
          <div key={campus.id} className="campus">
            {campus.imageurl === "" || !checkImageUrlValidity(campus.imageurl) ? 
              <img className="campus-image" src="https://cdn-icons-png.flaticon.com/512/904/904861.png" alt="campus"></img> 
              : <img className="campus-image" src={campus.imageurl} alt="campus"></img>
            }
            <div id="campus-info-container">
              <div className="campus-info-title">
                <Link to={`/campus/${campus.id}`}>
                  <h2 id="campus-name-container">{campus.name.length > 55 ? `${campus.name.substring(0, 55)}...` : campus.name}</h2>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h4 className="campus-id">campus id: {campus.id}</h4>
              </div>
              <div>
                <p className="campus-address-container">Address: {campus.address}</p>
                <p className="campus-description-container">{campus.description}</p>
              </div>
            </div>
            <div className="buttons-container">
              <button onClick = {() => handleEdit(campus.id)}>Edit</button>
              <button id="campus-delete-button" onClick={() => deleteCampus(campus.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;