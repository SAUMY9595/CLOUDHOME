import React, { useState } from "react";
import useSignup from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useSignup();

  const handleSubmit = () => {
    const validation = true;
    if (validation) {
      signup({ email, password });
    } else {
      toast.error("Invalid email or password");
      alert("validation failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <p>Already have an account? <Link to="/login">Login</Link></p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
        />
        <button onClick={handleSubmit}>Signup</button>
      </div>
    </div>
  );
};

export default SignupPage;