import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    img: null,
  });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/employee/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log("Error get user by Id");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setEmployee({
      ...employee,
      img: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("phone", employee.phone);
    formData.append("department", employee.department);
    if (employee.img) {
      formData.append("img", employee.img);
    }
    try {
      axios.put(`http://localhost:8080/api/employee/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("There was an error updating the employee!", error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center mt-4">Update Employee</h1>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                placeholder="Enter name ..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                placeholder="Enter email ..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                placeholder="Enter phone ..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                className="form-control"
                id="department"
                name="department"
                value={employee.department}
                onChange={handleChange}
                placeholder="Enter department ..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="img">Img</label>
              <input
                type="file"
                className="form-control"
                id="img"
                name="img"
                onChange={handleFileChange}
                placeholder="Upload an image ..."
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
