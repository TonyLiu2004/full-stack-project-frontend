/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email:"",
      imageUrl: null,
      gpa:0.0,
      campusId: null, 
      redirect: false, 
      redirectId: null
    };
  }
  async componentDidMount() {
    try {
      await this.props.fetchAllCampuses();
      console.log("fetchAllCampuses completed");
      console.log(this.props);
      // Update state with the campusId after allCampuses are fetched
      if (this.props.allCampuses.length > 0) {
        this.setState({ campusId: this.props.allCampuses[0].id });
      }
    } catch (error) {
        console.error("Error fetching campuses:", error);
    }
  }
  // Capture input data when it is entered
  handleChange = event => {
    if(event.target.name === "imageUrl"){
      this.setState({
          [event.target.name]: event.target.value,
          tempurl: event.target.value
      })
    }else{
        this.setState({
            [event.target.name]: event.target.value
        });
    }
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    if(this.state.firstname === "" || this.state.lastname === "" || this.state.email === "") {
      alert("Missing Information");
      return;
    }

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.state.campusId,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
        gpa: this.state.gpa,
    };
    console.log("ADDING STUDENT", student);
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      campusId: null, 
      email:"",
      imageUrl:"",
      gpa:0.0,
      redirect: true, 
      redirectId: newStudent.id,
      tempurl:""
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}    
          campuses={this.props.allCampuses} 
          tempurl={this.state.tempurl}
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

const mapStateToProps = state => ({
  allCampuses: state.allCampuses, // Adjust based on your Redux state structure
});

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapStateToProps, mapDispatch)(NewStudentContainer);