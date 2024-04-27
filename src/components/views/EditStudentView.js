import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
    formContainer:{  
      width: '500px',
      backgroundColor: '#f0f0f5',
      borderRadius: '5px',
      margin: 'auto',
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
      textDecoration: 'none'
    }, 
    customizeAppBar:{
      backgroundColor: '#11153e',
      shadows: ['none'],
    },
    formTitle:{
      backgroundColor:'#c5c8d6',
      marginBottom: '15px',
      textAlign: 'center',
      borderRadius: '5px 5px 0px 0px',
      padding: '3px'
    },
  }));

const EditStudentView = (props) => {
    const {student, handleChange, handleSubmit, campuses } = props;
    console.log(student);
    const classes = useStyles();

    return (
        <div>
          <h1>Edit Student</h1>
    
          <div className={classes.root}>
            <div className={classes.formContainer}>
              <div className={classes.formTitle}>
                <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
                  {student.firstname} {student.lastname}
                </Typography>
              </div>
              <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
                <input type="text" name="firstname" onChange ={(e) => handleChange(e)} />
                <br/>
                <br/>
    
                <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
                <input type="text" name="lastname" onChange={(e) => handleChange(e)} />
                <br/>
                <br/>
    
                <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus: </label>
                <select name="campusId" onChange={(e) => handleChange(e)}>
                  {
                    campuses.map((campus) => {
                      return <option key={campus.id} value={campus.id}>
                              {campus.name.length > 30 ? `${campus.name.slice(0, 20)}...` : campus.name}
                              </option>
                    })
                  }
                </select>
                
                <br/>
                <br/>
    
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
                <br/>
                <br/>
              </form>
              </div>
          </div>
        </div>    
      )
}

export default EditStudentView;