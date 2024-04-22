import "./NewCampusView.css";
  const NewCampusView = (props) => {
    const {handleChange, handleSubmit } = props;
    // Render a New Student view with an input form
    return (
      <div>
        <h1>Add a New Campus</h1>
  
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
    )
  }
  
  export default NewCampusView;