import "./NewStudentView.css";
const NewStudentView = (props) => {
  const {handleChange, handleSubmit, campuses, tempurl } = props;
  console.log(campuses);

  // Render a New Student view with an input form
  return (
    <div>
      <h1 className="new-student-title">New Student</h1>

      <div style={{display:"flex", margin:"auto", flexWrap:"wrap", justifyContent:"space-evenly", width:"80%"}}>
        <div style={{maxWidth:"40%", flexBasis:"40%", flexShrink:"0"}}>
          {tempurl === undefined ?
              <img style={{paddingLeft:"30px", height:"auto", maxWidth:"100%"}} src="https://thumbs.dreamstime.com/b/student-icon-vector-graduation-mortar-board-school-college-university-glyph-pictogram-male-person-profile-avatar-108392101.jpg" alt="campus"></img> 
              : <img style={{padding:"30px", height:"auto", maxWidth:"100%"}} src={tempurl} alt="student" onError={(e) => { 
                  e.target.src = 'https://thumbs.dreamstime.com/b/student-icon-vector-graduation-mortar-board-school-college-university-glyph-pictogram-male-person-profile-avatar-108392101.jpg';
              }}></img> 
          }
        </div>
        <div className="new-student-container">
          <div className="">
            <form className="new-student-form" onSubmit={(e) => handleSubmit(e)}>
              <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
              <input className="new-student-input" type="text" name="firstname" onChange ={(e) => handleChange(e)} />
              
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
              <input className="new-student-input" type="text" name="lastname" onChange={(e) => handleChange(e)} />

              <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus: </label>
              <select className="new-student-select" name="campusId" onChange={(e) => handleChange(e)}>
                {
                  campuses.map((campus) => {
                    return <option className="new-student-campus-option" key={campus.id} value={campus.id}>
                            {campus.name.length > 30 ? `${campus.name.slice(0, 20)}...` : campus.name}
                            </option>
                  })
                }
              </select>

              <label style={{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
              <input className="new-student-input" type="email" name="email" onChange={(e) => handleChange(e)} />

              <label style={{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
              <input className="new-student-input" type="text" name="imageUrl" onChange={(e) => handleChange(e)} />

              <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
              <input className="new-student-input" type="number" name="gpa" min="0.0" max="4.0" step="0.1" onChange={(e) => handleChange(e)} />
              
              <button className="new-student-submit-button" type="submit">
                Submit
              </button>
            </form>
            </div>
        </div>
      </div>
    </div>    
  )
}

export default NewStudentView;