import { Switch, Route } from "react-router-dom";

import "./App.css";

import Create from "./pages/Create/Create";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Project from "./pages/Project/Project";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/create" component={Create} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/projects/:id" component={Project} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
