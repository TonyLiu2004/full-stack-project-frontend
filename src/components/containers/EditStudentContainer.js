import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchAllCampusesThunk, fetchStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstname: this.props.student.firstname, 
            lastname: this.props.student.lastname, 
            id: this.props.student.id,
            campusId: null, 
            campus:this.props.student.campus,
            email: this.props.student.email,
            gpa: this.props.student.gpa,
            imageUrl: this.props.student.imageUrl,
            redirect: false, 
            redirectId: null,
            tempurl: this.props.student.imageUrl
        };
    }

    async componentDidMount() {
        try {
            await this.props.fetchAllCampuses();
            await this.props.fetchStudent(this.props.match.params.id);
            console.log(this.props);
            if (this.props.allCampuses && this.props.allCampuses.length > 0) { //initialize selected campus to first campus
                this.setState({
                    campusId: this.props.allCampuses[0].id,
                });
            }
        } catch (error) {
            console.error("Error fetching campuses:", error);
        }
    }

    // Capture input data when it is entered
    handleChange = event => {
        console.log(event.target);
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
            campus: this.props.allCampuses.find(campus => campus.id === this.state.campusId) || {}, 
            id: this.props.student.id,
            email: this.state.email,
            gpa: this.state.gpa,
            imageUrl: this.state.imageUrl
        };

        await this.props.editStudent(student);

        this.setState({
            firstname: "", 
            lastname: "", 
            campusId: null,
            campus:null,
            id: null, 
            email: "",
            gpa: null,
            imageUrl: "",
            redirect: true, 
            redirectId: this.props.student.id
        });
    }
    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }
    render() {
        // Redirect to student's page after submit
        if(this.state.redirect) {
          return (<Redirect to={`/student/${this.state.redirectId}`}/>)
        }
    
        // Display the input form via the corresponding View component
        return (
          <div>
            <Header />
            <EditStudentView 
              student = {this.props.student}
              handleChange = {this.handleChange} 
              handleSubmit={this.handleSubmit}    
              campuses={this.props.allCampuses} 
              tempurl={this.state.tempurl}
            />
          </div>          
        );
      }
}

const mapDispatch = (dispatch) => {
    return({
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

const mapState = state => ({
    allCampuses: state.allCampuses, // Adjust based on your Redux state structure
    student: state.student,
});

export default connect(mapState, mapDispatch)(EditStudentContainer);