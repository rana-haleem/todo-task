import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
  const [addUser, { data }] = useMutation(ADD_TODO);

  return (
    <div>
        <form
            onSubmit={e => {
            e.preventDefault();
            addUser({ variables: { title: title.value , description: description.value, status: status.value, priority: priority.value} });
            title.value = '';
            description.value = '';
            status.value = '';
            priority.value = '';

            }}
        >
            <label>Title</label>
            <input ref={node => { title = node; }}/>
            <label>Description</label>
            <input ref={node => { description = node;}}/>
            <label>Priority</label>
            <input ref={node => { priority = node;}}/>
            <label>Status</label>
            <input ref={node => { status = node;}}/>
            <button type="submit">Add Todo</button>
        </form>
    </div>
  );
}




export default AddTodos;