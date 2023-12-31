import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  Navigate
} from "react-router-dom";

// Create fake users data
const fakeUsers = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

// Home Page component
const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
      </ul>
    </div>
  );
};

// Users List Page component
const UsersListPage = () => {
  return (
    <div>
      <h1>User List Page</h1>
      <ul>
        {fakeUsers.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}/profile`}>User - {user.id}</Link>
          </li>
        ))}
      </ul>
      <ul>
        <li>
          <Link to="/">Home Page</Link>
        </li>
      </ul>
    </div>
  );
};

// User Info Page component
const UserInfoPage = () => {
  const { id } = useParams();
  const user = fakeUsers.find((user) => user.id === Number(id));

  if (!user) {
    return <Navigate to="/users" />;
  }

  return (
    <div>
      <h1>User Info Page</h1>
      <p>User Id: {user.id}</p>
      <ul>
        <li>
          <Link to={`/users/${id}/edit`}>Edit User</Link>
        </li>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
      </ul>
    </div>
  );
};

// User Edit Page component
const UserEditPage = () => {
  const { id } = useParams();
  const user = fakeUsers.find((user) => user.id === Number(id));

  if (!user) {
    return <Navigate to={`/users/${id}/profile`} />;
  }

  const getRandomUserId = () => {
    const userIds = fakeUsers.map((user) => user.id);
    const randomIndex = Math.floor(Math.random() * userIds.length);
    return userIds[randomIndex];
  };

  return (
    <div>
      <h1>User Edit Page</h1>
      <ul>
        <li>
          <Link to={`/users/${id}/profile`}>User Profile Page</Link>
        </li>
        <li>
          <Link to={`/users/${getRandomUserId()}/profile`}>
            Another User Page
          </Link>
        </li>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
      </ul>
    </div>
  );
};

//

// App component
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/users/:id/profile" element={<UserInfoPage />} />
          <Route path="/users/:id/edit" element={<UserEditPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;







