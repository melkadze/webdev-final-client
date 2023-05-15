/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
    // Get student data from back-end database
    componentDidMount() {
      //getting student ID from url
      this.props.fetchStudent(this.props.match.params.id);
    }
    
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: this.props.student.firstname,
      lastname: this.props.student.lastname,
      campusId: this.props.student.campusId,
    email: this.props.student.email,
    gpa: this.props.student.gpa,
    imageUrl: this.props.student.imageUrl,
      redirect: false, 
      redirectId: null,
        id: this.props.student.id
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

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.state.campusId,
        email: this.state.email,
        gpa: this.state.gpa,
        imageUrl: this.state.imageUrl,
        id: this.props.match.params.id // use a prop as this should not be changed
    };
    
    // Edit student in back-end database
    let editedStudent = await this.props.editStudent(student);
    console.log(await editedStudent)

    // Update state, and trigger redirect to show the edited student
    this.setState({
      firstname: "",
      lastname: "", 
      campusId: null,
    email: "",
    gpa: null,
    imageUrl: null,
      redirect: true, 
      redirectId: this.props.student.id,
        id: ""
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
        <EditStudentView
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          student={this.props.student}
        />
      </div>          
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "StudentContainer" to connect to Redux Store.
// The following 2 input arguments are passed to the "connect" function used by "AllStudentsContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "student"
  };
};

// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);
