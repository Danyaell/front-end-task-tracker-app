import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Task Tracker App",
  description:
    "Task Tracker App - Keep organized your work, keep track of your tasks, JIRA board style.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <footer>
            <p>© 2024 Task Tracker App. All rights reserved.</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
