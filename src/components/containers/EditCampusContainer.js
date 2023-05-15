/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
    // Get campus data from back-end database
    componentDidMount() {
      //getting campus ID from url
      this.props.fetchCampus(this.props.match.params.id);
    }
    
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      name: this.props.campus.name,
      address: this.props.campus.address,
      description: this.props.campus.description,
    imageUrl: this.props.campus.imageUrl,
      redirect: false, 
      redirectId: null,
    id: this.props.campus.id
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let campus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        id: this.props.match.params.id // use a prop as this should not be changed
    };
    
    // Add edited campus in back-end database
    let editedCampus = await this.props.editCampus(campus);

    // Update state, and trigger redirect to show the new campus
    this.setState({
    name: "",
    address: "",
    description: null,
  imageUrl: null,
      redirect: true, 
      redirectId: this.props.campus.id,
        id: ""
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new campus input form
  render() {
    // Redirect to new campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
        campus={this.props.campus}
        />
      </div>          
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" to connect to Redux Store.
// The following 2 input arguments are passed to the "connect" function used by "AllCampusesContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
  };
};

// The following input argument is passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    })
}

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);
