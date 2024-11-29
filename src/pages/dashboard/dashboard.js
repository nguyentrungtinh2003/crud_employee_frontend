import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);

  useEffect(() => {
    axios
      .get(`http://backend:8080/api/employee/all`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log("Error get all employee !");
      });
  }, []);

  const handelView = (id) => {
    axios
      .get(`http://backend:8080/api/employee/${id}`)
      .then((response) => {
        setEmployeeId(response.data);
      })
      .catch((error) => {
        console.log("Error get employee by id !");
      });
  };

  const handelDelete = (id, name) => {
    const userConfirm = window.confirm(
      `Bạn có muốn xoá nhân viên tên ${name} không ?`
    );
    if (userConfirm) {
      axios
        .delete(`http://localhost:8080/api/employee/delete/${id}`)
        .then((response) => {
          console.log("Delete employee success !");
        })
        .catch((error) => {
          console.log("Error delete employee !");
        });
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Employee List</h1>
      <button className="btn btn-primary mb-4">
        <a className="navbar-brand" href="/employee">
          Post Employee
        </a>
      </button>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Img</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => {
            return (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.department}</td>
                <td>
                  <img
                    src={`http://localhost:8080/uploads/${emp.img}`}
                    alt="Employee"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <a href={`/employee/${emp.id}`}>
                    <button className="btn btn-warning">Edit</button>
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handelDelete(emp.id, emp.name)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <a href={`/view/${emp.id}`}>
                    <button
                      className="btn btn-info"
                      onClick={() => handelView(emp.id)}
                    >
                      View
                    </button>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
