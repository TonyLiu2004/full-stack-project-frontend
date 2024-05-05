import "./NewCampusView.css";
  const NewCampusView = (props) => {
    const {handleChange, handleSubmit, tempurl} = props;
    // Render a New Student view with an input form
    return (
      <div>
        <h1>Add a New Campus</h1>
        <div style={{display:"flex", margin:"auto", flexWrap:"wrap", justifyContent:"space-evenly", width:"80%"}}>
          <div style={{maxWidth:"40%", flexBasis:"40%", flexShrink:"0"}}>
              {tempurl === undefined ?
                  <img style={{paddingLeft:"30px", height:"auto", maxWidth:"100%"}} src="https://cdn-icons-png.flaticon.com/512/904/904861.png" alt="campus"></img> 
                  : <img style={{padding:"30px", height:"auto", maxWidth:"100%"}} src={tempurl} alt="campus" onError={(e) => { 
                      e.target.src = 'https://cdn-icons-png.flaticon.com/512/904/904861.png';
                  }}></img> 
              }
          </div>
          <div id="container">
            <div id="">
              <form id="form-container" onSubmit={(e) => handleSubmit(e)}>
                <label style= {{color:'#black', fontWeight: 'bold'}}>Name: </label>
                <input className = "input" type="text" name="name" placeholder="Enter a Name" onChange ={(e) => handleChange(e)} />
    
                <label style={{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
                <input className = "input" type="text" name="imageurl" placeholder="Enter an Image URL" onChange={(e) => handleChange(e)} />
    
                <label style={{color:'#11153e', fontWeight: 'bold'}}>Address: </label>
                <input className = "input" type="text" name="address" placeholder="Enter an Address" onChange={(e) => handleChange(e)} />

                <label style={{color:'#11153e', fontWeight: 'bold'}}>Description: </label>
                <textarea className = "input-paragraph" type="text" name="description" placeholder="Enter a Description" onChange={(e) => handleChange(e)} />

                <button id="submit-button" type="submit">
                  SUBMIT
                </button>
              </form>
              </div>
          </div>
        </div>
      </div>    
    )
  }
  
  export default NewCampusView;