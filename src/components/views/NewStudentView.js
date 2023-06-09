/*==================================================
NewStudentView.js

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

const NewStudentView = (props) => {
  const {handleChange, handleSubmit } = props;
  const classes = useStyles();
    
  // so that we can use queryParameters.get("campusId") to support adding student to specific campus found in url parameter
  const queryParameters = new URLSearchParams(window.location.search)
  const paramsCampusId = queryParameters.get("campusId")

  // Render a New Student view with an input form
  return (
    <div>
      <h1>New Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Add a Student
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
            <input type="text" name="firstname" required onChange ={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
            <input type="text" name="lastname" required onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus Id: </label>
            <input defaultValue={paramsCampusId} type="text" name="campusId" onChange={(e) => handleChange(e)} />
            <br/>
            <br/>
          
          <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
          <input type="number" name="gpa" step="0.1" min="0.0" max="4.0" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>
          
          {/* We make the email field pass the default campusId as it must be set by the user, forcing the handleChange to run
              (we cannot put this in the campusId field itself, as the user will not change it, thus the change will not be hanldled */}
          <label style={{color:'#11153e', fontWeight: 'bold'}}>E-mail: </label>
          <input type="email" name="email" required onChange={(e) => handleChange(e, paramsCampusId)} />
          <br/>
          <br/>
          
          <label style={{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
          <input type="url" name="imageUrl" onChange={(e) => handleChange(e)} />
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

export default NewStudentView;
