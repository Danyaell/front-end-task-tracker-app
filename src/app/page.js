import "./home.css";

export default function Home() {
  return (
    <div className="homeContainer">
      <h1>Task Tracker App</h1>
      <p>Keep organized your work, keep track of your tasks, JIRA board style.</p>
      <div>
        <a href="/login">Login</a> | {" "}
        <a href="/register">Sign Up</a>
      </div>
    </div>
  );
}
