import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/allUsersReducer";
import { useEffect } from "react";
import ShowUsers from "../components/ShowUsers";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      <ShowUsers users={users} />
    </div>
  );
};
export default Users;
