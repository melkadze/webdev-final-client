/*==================================================
EditStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const EditStudentView = (props) => {
  const {handleChange, handleSubmit, student } = props;
  const classes = useStyles();

  // Render a New Student view with an input form
  return (
    <div>
      <h1>Edit Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Edit a Student
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
            <input defaultValue={student.firstname} type="text" name="firstname" required onChange ={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
          <input defaultValue={student.lastname} type="text" name="lastname" required onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus Id: </label>
          <input defaultValue={student.campusId} type="text" name="campusId" onChange={(e) => handleChange(e)} />
            <br/>
            <br/>
          
          <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
          <input defaultValue={student.gpa} type="number" name="gpa" step="0.1" min="0.0" max="4.0" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>
          
          <label style={{color:'#11153e', fontWeight: 'bold'}}>E-mail: </label>
          <input defaultValue={student.email} type="email" name="email" required onChange={(e) => handleChange(e)} />
          <br/>
          <br/>
          
          <label style={{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
          <input defaultValue={student.imageUrl} type="url" name="imageUrl" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br/>
            <br/>
          </form>
          </div>
      </div>
    </div>    
  )
}

export default EditStudentView;
