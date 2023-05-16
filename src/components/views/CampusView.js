/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, deleteStudent} = props;
    
    // Refresh campus (and its students) once student is deletes
    const deleteStudentAndRefresh = (studentId) => {
        deleteStudent(studentId)
        props.fetchCampus(campus.id)
    }
    
    // Go back to all campuses view once a campus is deleted
    var userHistory = useHistory()
    const deleteCampusAndRedirect = (campusId) => {
        deleteCampus(campusId)
        userHistory.push("/campuses")
    }
    
    if (!campus.students.length) {
        // Render a single Campus view with list of its students
        return (
                <div>
                <h1>{campus.name}</h1>
                <img src={campus.imageUrl} alt="Campus"></img>
                <p>{campus.address}</p>
                <p>{campus.description}</p>
                <h2>There are no enrolled students.</h2>
                <br></br>
                <br></br>
                <Link to={`/newstudent?campusId=${campus.id}`}>
                  <button>Add New Student to Campus</button>
                </Link>
                <br></br>
                <Link to={`/students`}>
                  <button>Select Existing Students to Add to Campus</button>
                </Link>
                <br></br>
                <br></br>
                <Link to={`/campus/edit/${campus.id}`}>
                  <button>Edit Campus</button>
                </Link>
                <button onClick={() => deleteCampusAndRedirect(campus.id)}>Delete</button>
                </div>
                );
    } else {
        
        // Render a single Campus view with list of its students
        return (
                <div>
                <h1>{campus.name}</h1>
                <img src={campus.imageUrl} alt="Campus"></img>
                <p>{campus.address}</p>
                <p>{campus.description}</p>
                {campus.students.map( student => {
                    let name = student.firstname + " " + student.lastname;
                    return (
                            <div key={student.id}>
                            <Link to={`/student/${student.id}`}>
                            <h2>{name}</h2>
                            </Link>
                            <button onClick={() => deleteStudentAndRefresh(student.id)}>Delete Student</button>
                            </div>
                            );
                })}
                <br></br>
                <br></br>
                <Link to={`/newstudent?campusId=${campus.id}`}>
                  <button>Add New Student to Campus</button>
                </Link>
                <br></br>
                <Link to={`/students`}>
                  <button>Select Existing Students to Add to Campus</button>
                </Link>
                <br></br>
                <br></br>
                <Link to={`/campus/edit/${campus.id}`}>
                  <button>Edit Campus</button>
                </Link>
                <button onClick={() => deleteCampusAndRedirect(campus.id)}>Delete</button>
                </div>
                );
    }
};

export default CampusView;
