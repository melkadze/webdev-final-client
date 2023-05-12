/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;
    
    
    if (!student.campus) {
        return (
                <div>
                <h1>{student.firstname + " " + student.lastname}</h1>
                <img src={student.imageUrl} alt="Student"></img>
                <p>{student.gpa}</p>
                <p>{student.email}</p>
                <h3>This student is currently not enrolled anywhere.</h3>
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
                <h3>{student.campus.name}</h3>
                </div>
                );
    }

};

export default StudentView;
