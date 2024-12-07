import Notification from "./components/Notification";
import Blog from "./components/Blog";
import Blogs from "./pages/Blogs";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./pages/Users";
import Layout from "./components/Layout";
import UserBlogs from "./components/UserBlogs";

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Notification />
                <Blogs />
              </div>
            }
          />
          <Route
            path="/users"
            element={
              <div>
                <Users />
              </div>
            }
          />
          <Route
            path="/users/:id"
            element={
              <div>
                <UserBlogs user={user} />
              </div>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <div>
                <Notification />
                <Blog />
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
