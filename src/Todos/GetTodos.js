import '../App.css';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
const GET_TEST_INFO = gql`
{
  todos {
    title
    description
    status
    priority
  }
}`
function GetTodos() {
  const { data, loading, error, refetch } = useQuery(GET_TEST_INFO);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error..</p>;
  return (
      <div>
      <h1 className="text-left mt-5 mb-5">Tasks</h1>
      <Link className="btn btn-dark mb-5" to="/create-todo">Create a Todo</Link>
          {data &&
            data.todos &&
            data.todos.map((tasks, index) => (
              <div key={index} className="row">
                <div className="col-lg-4"> 
                  <span>{tasks.title}</span>
                </div>
                <div className="col-lg-4"> 
                  <div className="dropdown">
                    <button className="btn btn-info dropdown-toggle" type="button" id="status" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Done
                    </button>
                    <div className="dropdown-menu" aria-labelledby="status">
                      <a className="dropdown-item" href="#">Work in Progress</a>
                      {/* <a className="dropdown-item" href="#">Done</a> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4"> 
                  <div className="dropdown">
                      <button className="btn btn-danger dropdown-toggle" type="button" id="priority" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          High
                      </button>
                      <div className="dropdown-menu" aria-labelledby="priority">
                        {/* <a className="dropdown-item" href="#">High</a> */}
                        <a className="dropdown-item" href="#">Medium</a>
                        <a className="dropdown-item" href="#">Low</a>
                      </div>
                    </div>
                </div>
              </div>
            ))}
        </div>
  );
}
export default GetTodos;
