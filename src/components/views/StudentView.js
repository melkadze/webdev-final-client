/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const StudentView = (props) => {
  const { student, deleteStudent } = props;
    
    var userHistory = useHistory()
    const deleteStudentAndRedirect = (studentId) => {
        deleteStudent(studentId)
        userHistory.push("/students")
    }
    
    if (!student.campus) {
        return (
                <div>
                <h1>{student.firstname + " " + student.lastname}</h1>
                <img src={student.imageUrl} alt="Student"></img>
                <p>{student.gpa}</p>
                <p>{student.email}</p>
                <h3>This student is currently not enrolled anywhere.</h3>
                <Link to={`/student/edit/${student.id}`}>
                  <button>Edit Student</button>
                </Link>
                <button onClick={() => deleteStudentAndRedirect(student.id)}>Delete</button>
                </div>
                );
    } else {
        
        // Render a single Student view
        return (
                <div>
                <h1>{student.firstname + " " + student.lastname}</h1>
                <img src={student.imageUrl} alt="Student"></img>
                <p>{student.gpa}</p>
                <p>{student.email}</p>
                <Link to={`/campus/${student.campus.id}`}>
                    <h3>{student.campus.name}</h3>
                </Link>
                <Link to={`/student/edit/${student.id}`}>
                  <button>Edit Student</button>
                </Link>
                <button onClick={() => deleteStudentAndRedirect(student.id)}>Delete</button>
                </div>
                );
    }

};

export default StudentView;
