import '../App.css';
import React , { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
const GET_TEST_INFO = gql`
{
  todos {
    id
    title
    description
    status
    priority
  }
}`
const UPDATE_TODO = gql`
  mutation UpdateStatus($id: Int, $status: String!) {
    updateStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
function GetTodos() {
  const { data, loading, error } = useQuery(GET_TEST_INFO);
  const [updateStatus] = useMutation(UPDATE_TODO);
  const [currentStatus, setCurrentStatus] = useState('todo')
  const changeStatus = (e,index) => {
      console.log("status",e);
      console.log("id",index)
    setCurrentStatus(e)
    updateStatus({ variables: { id:index, status: e} });
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error..</p>;
  
  return (
      <div>
      <h1 className="text-left mt-5 mb-5">Tasks</h1>
      <Link className="btn btn-dark mb-5" to="/create-todo">Create a Todo</Link>
          {data &&
            data.todos &&
            data.todos.map((tasks, index) => (
                
              <div key={index} className="row row-t">
                <div className="col-lg-4"> 
                    <Link to={{pathname: "/view-todo", state: {id: tasks.id}}}><span>{tasks.title}</span></Link>
                </div>
                <div className="col-lg-4"> 
                    <select
                        onChange={(event) => changeStatus(event.target.value,tasks.id)}
                        value={tasks.status} 
                    >
                        <option value="Done">Done</option>
                        <option value="Work in Progress">Work in progress</option>
                        <option value="Todo">Todo</option>
                    </select>
                </div>
                <div className="col-lg-4"> 
                    <select
                    >
                        <option value="high">High</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                    </select>
                </div>
              </div>
            ))}
        </div>
  );
}
export default GetTodos;
