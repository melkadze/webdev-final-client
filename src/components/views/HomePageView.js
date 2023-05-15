/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { Link } from "react-router-dom";
const HomePageView = () => {
  // Render Home page view
  return (
    <div >
          <h1>Home Page</h1>
          <h2>Welcome to the Campus Management System!</h2>
          <Link to={`/students`}>
            <button>Click here to see all students!</button>
          </Link>
          <br></br>
          <br></br>
          <Link to={`/campuses`}>
          <button>Click here to see all campuses!</button>
          </Link>
    
    </div>
  );    
}

export default HomePageView;
