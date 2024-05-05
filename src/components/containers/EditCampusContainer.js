import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';

import EditCampusView from '../views/EditCampusView';

class EditCampusContainer extends Component {
    constructor(props){
        super(props);
        console.log(props.campus);
        this.state = {
            name: this.props.campus.name, 
            imageurl: this.props.campus.imageurl, 
            address: this.props.campus.address, 
            description: this.props.campus.description,
            id: this.props.campus.id,
            redirect: false, 
            redirectId: null,
            tempurl: this.props.campus.imageurl,
        };
    }
    
    handleChange = event => {
        console.log( event.target);
        if(event.target.name === "imageurl"){ 
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

    // componentDidMount() {
    //     // Get campus ID from URL (API link)
    //     this.props.fetchCampus(this.props.match.params.id);
    
    // }
    async componentDidMount() {
        try {
            await this.props.fetchCampus(this.props.match.params.id);
            console.log(this.props.campus);
        } catch (error) {
            console.error("Error fetching campuses:", error);
        }
    }
    handleSubmit = async event => {
        event.preventDefault();  // Prevent browser reload/refresh after submit.
        if(this.state.name === "" || this.state.address === "" || this.state.description === "") {
            alert("Missing Information");
            return;
        }
        console.log(this.state);
        console.log(this.props);
        let campus = {
            name: this.state.name,
            imageurl: this.state.imageurl,
            address: this.state.address,
            description: this.state.description,
            id: this.props.campus.id,
        };
        
        await this.props.editCampus(campus);
    
        // Update state, and trigger redirect to show the new campus
        this.setState({
          name: "", 
          imageurl: "", 
          address: "", 
          description: "",
          id: null,
          redirect: true, 
          redirectId: this.props.campus.id,
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        // Redirect to student's page after submit
        if(this.state.redirect) {
          return (<Redirect to={`/campus/${this.props.campus.id}`}/>)
        }
    
        // Display the input form via the corresponding View component
        return (
          <div>
            <Header />
            <EditCampusView 
              campus = {this.props.campus}
              handleChange = {this.handleChange} 
              handleSubmit={this.handleSubmit}    
              tempurl={this.state.tempurl}
            />
          </div>          
        );
      }
}

const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    })
}

const mapState = (state) => {
    return {
      campus: state.campus,  
    };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);