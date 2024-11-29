import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./pages/header/Header";
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate for redirecting
import NoMatch from "./pages/noMatch/NoMatch";
import Dashboard from "./pages/dashboard/dashboard";
import PostUser from "./pages/employee/PostUser";
import UpdateUser from "./pages/employee/UpdateUser";
import Login from "./Login";
import Register from "./Register";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import ViewUser from "./pages/employee/ViewUser";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/#/employee" element={<PostUser />} />
        <Route path="/employee/:id" element={<UpdateUser />} />
        <Route path="/view/:id" element={<ViewUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/*" element={<NoMatch />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
