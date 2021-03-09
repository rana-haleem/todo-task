import React , { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import {useLocation} from "react-router-dom";


const GET_TODO_INFO = gql`
query todo($id: Int) {
  todo(id: $id) {
    title
    description
    status
    priority
  }
}
`;
function ViewTodo() {
  let todo_id = useLocation();
  console.log(todo_id.state.id)
  const { data, loading, error } = useQuery(GET_TODO_INFO, { variables: { id: todo_id.state.id }});
    console.log('dd',data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error..</p>;
  
  return (
      <div>
      <h1 className="text-left mt-5 mb-5">Todo Details</h1>
          
              <div className="row flex-column text-left ml-4">
                  <h3>Title</h3>
                  <span>{data.todo.title}</span>
                  <h3 className="mt-3">Description</h3>
                  <span>{data.todo.description}</span>
                  <h3 className="mt-3">Status</h3>
                  <span>{data.todo.status}</span>
                  <h3 className="mt-3">Priority</h3>
                  <span>{data.todo.priority}</span>
               </div>
        </div>
  );
}
export default ViewTodo;
