import { Link } from "react-router-dom";
import { setUser, clearUser } from "../reducers/userReducer";
import userStorage from "../services/userStorage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userBlogsList } from "../reducers/allUsersReducer";
import Notification from "./Notification";
import { setNotification } from "../reducers/notificationReducer";
import loginService from "../services/login";
import Login from "./Login";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from "@headlessui/react";

import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
const Layout = ({ children }) => {
  const navigation = [
    { name: "Home", href: "/", key: "home", current: true },
    { name: "User", href: "/users", key: "user", current: false }
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
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
      {/* <div style={navStyle}>
        <Link style={linkStyle} to="/">
          Home
        </Link>
        <Link style={linkStyle} to="/users">
          Users
        </Link>
        <div style={userInfoStyle}></div>
        {user && <div>{user.name} logged in</div>}
        <button onClick={handleLogout}>Logout</button>
      </div> */}
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.key}
                      to={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* <span className="text-white">
              {user && <div>{user.name} logged in</div>}
            </span>
            <div>
              <button className="bg-blue-900 text-white" onClick={handleLogout}>
                Logout
              </button>
            </div> */}
            <span className="text-white font-semibold mr-4">
              {user && (
                <div className="flex items-center space-x-2">
                  <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm">
                    {user.name}
                  </span>
                  <span>logged in</span>
                </div>
              )}
            </span>
            <div>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
