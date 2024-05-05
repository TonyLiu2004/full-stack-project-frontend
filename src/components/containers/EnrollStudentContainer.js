import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchCampusThunk, editStudentThunk, fetchAllStudentsThunk } from '../../store/thunks';
import EnrollStudentView from '../views/EnrollStudentView';
class EnrollStudentContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            enrollStudent: [],
            redirect: false, 
            redirectId: null
        };
    }
    async componentDidMount() {
        try {
            console.log(this.props.match.params.id);
            this.props.fetchCampus(this.props.match.params.id);
            await this.props.fetchAllStudents();
        } catch (error) {
            console.error("Error fetching campuses:", error);
        }
    }

    handleChange = (student) => {
        const isEnrolled = this.state.enrollStudent.some((s) => s.id === student.id);
        if(isEnrolled){
            const updatedEnrollStudent = this.state.enrollStudent.filter((s) => s.id !== student.id);
            this.setState({ enrollStudent: updatedEnrollStudent });
        }else{
            const updatedEnrollStudent = [...this.state.enrollStudent, student];
            this.setState({ enrollStudent: updatedEnrollStudent });
        }
    }

    handleEnroll = async (student) => {
        let editedStudent = {
          firstname: student.firstname,
          lastname: student.lastname,
          campusId: this.props.campus.id,
          campus: this.props.campus.id,
          id: student.id,
          email: student.email,
          gpa: student.gpa,
          imageUrl: student.imageUrl
        };
        await this.props.editStudent(editedStudent);
    }
      
    handleSubmit = async event => {
        event.preventDefault();
        for (let i in Object.keys(this.state.enrollStudent)) {
            const student = this.state.enrollStudent[i];
            await this.handleEnroll(student);
        }
        await this.props.fetchCampus(this.props.match.params.id);
        this.setState({
            redirect: true,
            redirectId: this.props.campus.id
        })
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
        }

        return(
            <div>
                <Header/>
                <EnrollStudentView
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleSubmit}
                    students = {this.props.allStudents}
                    campus={this.props.campus} 
                />
            </div>
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
        editStudent: (student) => dispatch(editStudentThunk(student)),

    })
}

const mapStateToProps = state => ({
    campus: state.campus,
    allStudents: state.allStudents,
});

export default connect(mapStateToProps, mapDispatch)(EnrollStudentContainer);