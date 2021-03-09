import '../App.css';
import React from 'react';
import GetTodos from './GetTodos'
import AddTodos from './AddTodos';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import profile from '../profile-user.png'
import ViewTodo from './ViewTodo';
function Todos() {
  return (

        <div className="App w-100 d-flex">
        <div className="col-1"> 
            <img className="w-50 d-block mx-auto mt-5" src={profile} alt="profile"></img>
        </div>
        <div className="container-fluid">
            <Router>
            <div>
                <Switch>
                    <Route path="/create-todo">
                        <AddTodos />
                    </Route>
                    <Route path="/view-todo">
                        <ViewTodo />
                    </Route>
                    <Route path="/">
                        <GetTodos />
                    </Route>

                </Switch>
            </div>
            </Router>
        </div>
      </div>
        
  );
}
export default Todos;
