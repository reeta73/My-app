import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role : "user"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = signup(formData);

    if (res.success) {
      alert("Signup successful");
      navigate("/login");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-6">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-white mb-8">
          Create account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            placeholder="Enter name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />

          <input
            placeholder="Enter mail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />

          <input
            placeholder="Enter Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />

          <button className="w-full bg-indigo-500 text-white py-2 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
