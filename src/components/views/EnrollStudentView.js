import "./EnrollStudentView.css";
const EnrollStudentView = (props) => {
    const {handleChange, handleSubmit, students, campus } = props;
    const filteredStudents = students.filter(student => student.campusId !== campus.id);
    return(
        <div>
            <h1>Enroll Students to {campus.name}</h1>
            {filteredStudents.length === 0 ? <h3>No students to enroll</h3> :
                <div className="checkbox-container">
                    {filteredStudents.map( student => {
                        let name = student.firstname + " " + student.lastname;
                        return (
                            <div key={student.id} className="checkbox-item">
                                <label htmlFor={`checkbox-${student.id}`} className="checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        id={`checkbox-${student.id}`} 
                                        className="enrollStudent-checkbox" 
                                        name="enrollStudent" 
                                        onChange={() => handleChange(student)} 
                                    />
                                    <span className="student-name">{name}</span> {/* Apply classNames to the student name */}
                                </label>
                            </div>
                        );
                    })}
                </div>
            }
            <button className="enrollStudent-submit-button" onClick={(event) => handleSubmit(event)}>Enroll Students</button>
        </div>
    )
}

export default EnrollStudentView;