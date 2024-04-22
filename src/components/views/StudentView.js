/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { useDispatch } from 'react-redux';
import { 
  deleteStudentThunk
} from '../../store/thunks';

const StudentView = (props) => {
  const { student } = props
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteStudentThunk(student.id));
    window.location.href = '/students';
  };
  const handleEdit = () => {
    window.location.href = `/students/${student.id}/edit`;
  }
  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>{student.campus.name}</h3>
      <button onClick = {() => handleEdit()}>Edit</button>
      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  );

};

export default StudentView;