import React, { useState } from "react";
import axios from "axios";

const Test = () => {
  // Khai báo state để lưu thông tin form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [university, setUniversity] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [hobby, setHobby] = useState("");
  const [img, setImg] = useState(null);

  const handleFileChange = (e) => {
    setImg(e.target.files[0]); // Lưu file khi người dùng chọn ảnh
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "user",
      new Blob(
        [
          JSON.stringify({
            username,
            email,
            password,
            phoneNumber,
            address,
            fullName,
            position,
            university,
            birthDay,
            hobby,
          }),
        ],
        { type: "application/json" }
      )
    );
    formData.append("img", img);

    try {
      const response = await axios.post(
        "http://localhost:8080/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Chỉ định loại nội dung multipart
          },
        }
      );
      console.log(response.data); // In ra kết quả từ server
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div>
          <label>University</label>
          <input
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />
        </div>
        <div>
          <label>Birthday</label>
          <input
            type="date"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          />
        </div>
        <div>
          <label>Hobby</label>
          <input
            type="text"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
          />
        </div>
        <div>
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Test;
