import "./App.css";

//Router
import { Switch, Route } from "react-router-dom";
//Components
import {
  HomePageContainer,
  CampusContainer,
  NewCampusContainer,
  EditCampusContainer,
  StudentContainer,
  AllCampusesContainer,
  AllStudentsContainer,
  NewStudentContainer,
  EditStudentContainer
} from './components/containers';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/campuses" component={AllCampusesContainer} />
        <Route exact path="/newcampus" component={NewCampusContainer} />
        <Route exact path="/campus/:id" component={CampusContainer} />
        <Route exact path="/campus/edit/:id" component={EditCampusContainer} />
        <Route exact path="/students" component={AllStudentsContainer} />
        <Route exact path="/newstudent" component={NewStudentContainer} />
        <Route exact path="/student/:id" component={StudentContainer} />
        <Route exact path="/student/edit/:id" component={EditStudentContainer} />
      </Switch>        
    </div>
  );
}

export default App;
