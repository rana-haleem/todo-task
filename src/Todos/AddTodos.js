import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react'
const GET_QUERY_INFO = gql`
{
  todos {
    title
    description
    status
    priority
  }
}`
const ADD_TODO = gql`
  mutation AddTodo($title: String, $description: String, $status: String, $priority: String) {
    addTodo(title: $title, description: $description, status: $status, priority: $priority) {
      title
      description
      status
      priority
    }
  }
`;
function AddTodos() {
  let title;
  let description;
  let status;
  let priority;
  const history = useHistory();
  const [addTodo, { data }] = useMutation(ADD_TODO, {
    refetchQueries: () => [{
        query: GET_QUERY_INFO,
      }]
  });
  const [currentPriority, setCurrentPriority] = useState('medium')
  const changePriority = (newPriority) => {
    setCurrentPriority(newPriority)
  }
  const [currentStatus, setCurrentStatus] = useState('Todo')
  const changeStatus = (newStatus) => {
    setCurrentStatus(newStatus)
  }
  return (
    <div className="container-fluid">
        <div className="row">
            <form
                onSubmit={() => {
                addTodo({ variables: { title: title.value , description: description.value, status: status.value, priority: priority.value} });
                title.value = '';
                description.value = '';
                status.value = '';
                priority.value = '';
                history.push('/')
                }} className="w-100">
                <div className="row mt-5">
                    <div className="d-flex flex-column text-left w-25">
                        <h5>Title</h5>
                        <input ref={node => { title = node; }}/>
                    </div>
                    <div className="d-flex flex-column text-left ml-4 w-25">
                        <h5>Description</h5>
                        <input ref={node => { description = node;}}/>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="d-flex flex-column text-left w-25">
                        <h5>Priority</h5>
                        <select ref={node => { priority = node;}}
                            onChange={(event) => changePriority(event.target.value)}
                            value={currentPriority} 
                        >
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="d-flex flex-column text-left ml-4 w-25">
                        <h5>Status</h5>
                        <select ref={node => { status = node;}}
                            onChange={(event) => changeStatus(event.target.value)}
                            value={currentStatus} 
                        >
                            <option value="Done">Done</option>
                            <option value="Work in Progress">Work in progress</option>
                            <option value="Todo">Todo</option>
                        </select>
                    </div>
                </div>
                <button className="btn-secondary d-block mr-auto mt-4" type="submit">Add Todo</button>
            </form>
        </div>
    </div>
  );
}
export default AddTodos;