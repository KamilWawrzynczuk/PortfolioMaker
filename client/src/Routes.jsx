import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from 'react-router-dom';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Intro from './components/Intro.jsx';
import Line from './components/Line.jsx';
import Projects from './components/Projects.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

function Routes() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" element={ <Login /> }></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/"
          element={
            <>
              <Intro />
              <Line />
              <Projects />
              <Line />
              <Contact />
              <Line />
            
            </>
          }
        ></Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
