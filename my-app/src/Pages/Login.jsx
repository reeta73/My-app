import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",

  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log(handleSubmit);
    
    e.preventDefault();

    const res = login(formData.email, formData.password);

    if (res.success) {
      alert("Login successful");
      navigate("/");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-6">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-white mb-8">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
          placeholder="Enter Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />

          <input
          placeholder="Enter password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />

          <button className="w-full bg-indigo-500 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;