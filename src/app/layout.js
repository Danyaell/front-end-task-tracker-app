import "./globals.css";

export const metadata = {
  title: "Task Tracker App",
  description:
    "Task Tracker App - Keep organized your work, keep track of your tasks, JIRA board style.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/" className="navButton">
            Home
          </a>
          <a href="/login" className="navButton">
            Login
          </a>
          <a href="/register" className="navButton">
            Register
          </a>
          <a href="/dashboard" className="navButton">
            Dashboard
          </a>
          <a href="/admin">Admin</a>
        </nav>
        <main>{children}</main>
        <footer>
          <p>© 2024 Task Tracker App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
