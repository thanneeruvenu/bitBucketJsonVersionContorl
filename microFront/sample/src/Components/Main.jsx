import React from "react";
import { Switch, Route } from "react-router-dom";
import Fetch from "./Fetch";
import Create from "./Create";
import Project from "./Project";
import Repository from "./Repository"
import Filehistory from "./Filehistory"
import { useHistory, useLocation } from "react-router-dom";




const Main = () => {
  const history = useHistory();
  const location = useLocation();
  
// UseHistory  
  const fetch = (di) => {
    history.push(di);
  };
  const active = (loc) => {
    console.log(location.pathname, loc);
    if (location.pathname === loc) {
      return {
        backgroundColor: "#cccccc",
        color: "#0061a8",
      };
    }
  };
  return (
    <div className="main">
      <div className="main-1">
        <span onClick={() => fetch("/fetch")} style={active("/fetch")}>
          <i className="fas fa-file-download"></i> Fetch
        </span>
        <span onClick={() => fetch("/create")} style={active("/create")}>
          <i className="far fa-plus-square"></i> Create
        </span>
        
      </div>
      <div>
        <Switch>
          <Route exact path="/fetch" component={Fetch} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/fetch/project" component={Project} />
          <Route exact path="/fetch/repository" component={Repository} />
          <Route exact path="/fetch/file-history" component={Filehistory} />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
