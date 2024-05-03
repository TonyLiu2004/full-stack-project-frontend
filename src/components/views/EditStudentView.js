import "./EditStudentView.css"
const EditStudentView = (props) => {
    const {student, handleChange, handleSubmit, campuses, tempurl } = props;
    console.log(student);
    console.log(tempurl);
    return (
        <div>
          <h1 className="edit-student-title">Editing {student.firstname} {student.lastname}</h1>

          <div style={{display:"flex", margin:"auto", flexWrap:"wrap", justifyContent:"space-evenly", width:"80%"}}>
            <div style={{maxWidth:"40%", flexBasis:"40%", flexShrink:"0"}}>
              {tempurl === undefined ?
                  <img style={{paddingLeft:"30px", height:"auto", maxWidth:"100%"}} src="https://thumbs.dreamstime.com/b/student-icon-vector-graduation-mortar-board-school-college-university-glyph-pictogram-male-person-profile-avatar-108392101.jpg" alt="campus"></img> 
                  : <img style={{padding:"30px", height:"auto", maxWidth:"100%"}} src={tempurl} alt="student" onError={(e) => { 
                      e.target.src = 'https://thumbs.dreamstime.com/b/student-icon-vector-graduation-mortar-board-school-college-university-glyph-pictogram-male-person-profile-avatar-108392101.jpg';
                  }}></img> 
              }
            </div>
            <div className="edit-student-container">
              <div>
                <form className="edit-student-form" onSubmit={(e) => handleSubmit(e)}>
                  <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
                  <input className="edit-student-input" type="text" name="firstname" onChange ={(e) => handleChange(e)} />
      
                  <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
                  <input className="edit-student-input" type="text" name="lastname" onChange={(e) => handleChange(e)} />
      
                  <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus: </label>
                  <select className="edit-student-input" name="campusId" onChange={(e) => handleChange(e)}>
                    {
                      campuses.map((campus) => {
                        return <option key={campus.id} value={campus.id}>
                                {campus.name.length > 30 ? `${campus.name.slice(0, 20)}...` : campus.name}
                                </option>
                      })
                    }
                  </select>

                  <label style={{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
                  <input className="edit-student-input" type="email" name="email" onChange={(e) => handleChange(e)} />

                  <label style={{color:'#11153e', fontWeight: 'bold'}}>Image Url: </label>
                  <input className="edit-student-input" type="text" name="imageUrl" onChange={(e) => handleChange(e)} />

                  <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
                  <input className="edit-student-input" type="number" name="gpa" min="0.0" max="4.0" step="0.1" onChange={(e) => handleChange(e)} />
                  <button className="edit-student-submit-button" type="submit">
                    Submit
                  </button>
                </form>
                </div>
            </div>
          </div>
        </div>    
      )
}

export default EditStudentView;