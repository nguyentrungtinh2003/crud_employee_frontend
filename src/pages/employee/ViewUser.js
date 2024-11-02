import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";

const ViewUser = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    img: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/employee/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log("Error getting employee by Id!");
      });
  }, [id]);

  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={`http://localhost:8080/uploads/${employee.img}`}
                className="card-img"
                alt={`${employee.name}`}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{employee.name}</h2>
                <p className="card-text">
                  <strong>Email:</strong> {employee.email}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {employee.phone}
                </p>
                <p className="card-text">
                  <strong>Department:</strong> {employee.department}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
