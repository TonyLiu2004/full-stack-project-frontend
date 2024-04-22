/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { Link } from "react-router-dom";
const HomePageView = () => {
  // Render Home page view
  return (
    <div>
      <h1>Campus Management System</h1>
      <img src="https://media.licdn.com/dms/image/C4E12AQHHPzri9BE0Hg/article-cover_image-shrink_600_2000/0/1548133891877?e=2147483647&v=beta&t=0qOc05CRzjvhiehQNSzp8T13w593cnNytIREkHkv7Cg" alt="campus"></img>
      <p style={{width:"67%", margin:"auto", paddingTop:"20px", paddingBottom:"20px", fontSize:"16px", fontFamily:"roboto, sans-serif"}}>Welcome to the Campus Management System! Our goal is to assist you in efficiently managing your campus. To get started, simply click the link below.</p>
      <Link to="/campuses">  
        <button
          style={{
            height: "40px",
            fontSize: "16px",
            fontFamily: "roboto, sans-serif",
            padding: "10px",
            backgroundColor: "lightblue",
            cursor: "pointer", 
            transition: "background-color 0.3s ease", 
            borderRadius: "3px",
            border:"1px solid black"
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#3be351")} 
          onMouseLeave={(e) => (e.target.style.backgroundColor = "lightgreen")} 
        >Get Started</button></Link>
      <br/><br/><br/>
    </div>
  );    
}

export default HomePageView;