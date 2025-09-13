import "./home.css";

export default function Home() {
  return (
    <div className="homeContainer">
      <h1 className="title">Task Tracker App</h1>
      <p>Keep organized your work, keep track of your tasks, JIRA board style.</p>
      <div className="linksContainer">
        <a href="/login" className="link">Login</a> | {" "}
        <a href="/register" className="link">Sign Up</a>
      </div>
    </div>
  );
}
