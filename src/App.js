import './App.css';
import Header from "./components/HeaderComponent"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Tickets from "./components/Tickets"
import Bags from "./components/Bags"
import Register from "./components/Register"
import Users from "./components/Users"
import Footer from './components/FooterComponent'


function App() {
  const headerLinks = [
  {
    title: "Register"
  },
  {
    title: "Users"
  },
  {
    title: "Tickets"
  },
  {
    title: "Bag's"
  }]  

return (
  <Router>
    <div className="App">
      <Header headerLinks={headerLinks}/>
        <div className="content">
          <Switch>
            <Route exact path="/">
                <Register/>
            </Route>
            <Route path="/Users">
                <Users/>
            </Route>
            <Route path="/Tickets">
                <Tickets/>
            </Route>
            <Route path="/Bag's">
                <Bags/>
            </Route>
          </Switch>
        </div>
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
