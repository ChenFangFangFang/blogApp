import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { setUser, clearUser } from "../reducers/userReducer";
import userStorage from "../services/userStorage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userBlogsList } from "../reducers/allUsersReducer";
import Notification from "./Notification";
import { setNotification } from "../reducers/notificationReducer";
import loginService from "../services/login";
import Login from "./Login";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user && user.id) {
      console.log(`Fetching blogs for user ID: ${user.id}`);
      dispatch(userBlogsList(user.id));
    }
  }, [dispatch, user]);
  useEffect(() => {
    const storedUser = userStorage.loadUser();
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]); //remain login
  const notify = (message, type = "success") => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setUser(user));
      userStorage.saveUser(user);
      notify(`Welcome back, ${user.name}`);
    } catch (error) {
      notify("Wrong credentials", "error");
    }
  };
  const handleLogout = () => {
    dispatch(clearUser());
    userStorage.removeUser();
    notify(`Bye, ${user.name}!`);
  };

  if (!user) {
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Blog Application
        </Typography>
        <Notification />
        <Login login={handleLogin} />
      </div>
    );
  }
  const navStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderBottom: "1px solid #ccc"
  };
  const linkStyle = {
    padding: "5px 10px",
    textDecoration: "none",
    color: "blue"
  };
  const userInfoStyle = {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  };

  return (
    <div>
      <div style={navStyle}>
        <Link style={linkStyle} to="/">
          Home
        </Link>
        <Link style={linkStyle} to="/users">
          Users
        </Link>
        <div style={userInfoStyle}></div>
        {user && <div>{user.name} logged in</div>}
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>{children}</div> {/* Render page-specific content here */}
    </div>
  );
};

export default Layout;
