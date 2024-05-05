import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "", 
            imageurl: "", 
            address: "", 
            description: "",
            redirect: false, 
            redirectId: null,
            tempurl: "",
        };
    }
    
    handleChange = event => {
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

    handleSubmit = async event => {
        event.preventDefault();  // Prevent browser reload/refresh after submit.
        if(this.state.name === "" || this.state.address === "" || this.state.description === "") {
            alert("Missing Information");
            return;
        }
        let campus = {
            name: this.state.name,
            imageurl: this.state.imageurl,
            address: this.state.address,
            description: this.state.description
        };
        
        // Add new campus in back-end database
        let newCampus = await this.props.addCampus(campus);
    
        // Update state, and trigger redirect to show the new campus
        this.setState({
          name: "", 
          imageurl: "", 
          address: "", 
          description: "",
          redirect: true, 
          redirectId: newCampus.id
        });
    }
    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }
    render() {
        // Redirect to new student's page after submit
        if(this.state.redirect) {
          return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
        }
    
        // Display the input form via the corresponding View component
        return (
          <div>
            <Header />
            <NewCampusView 
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
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

export default connect(null, mapDispatch)(NewCampusContainer);