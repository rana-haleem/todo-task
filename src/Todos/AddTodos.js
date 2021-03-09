import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
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
  const [addUser, { data }] = useMutation(ADD_TODO, {
    refetchQueries: () => [{
        query: GET_QUERY_INFO,
      }]
  });
  return (
    <div>
        <form
            onSubmit={() => {
            addUser({ variables: { title: title.value , description: description.value, status: status.value, priority: priority.value} });
            title.value = '';
            description.value = '';
            status.value = '';
            priority.value = '';
            history.push('/')
            }}>
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