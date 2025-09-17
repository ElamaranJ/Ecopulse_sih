import React, { useState } from "react";
import bg from "./assets/space.jpg";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign up with", name, email, password);
    alert("Sign up clicked — replace with your logic");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `
          linear-gradient(135deg, rgba(74,144,226,0.3) 0%, rgba(155,81,224,0.3) 100%),
          url(${bg}) center/cover,
          linear-gradient(45deg, #667eea 0%, #764ba2 100%)
        `,
        backgroundAttachment: "fixed",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <form
        onSubmit={handleSignUp}
        style={{
          width: 420,
          borderRadius: 20,
          padding: 36,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: "1.6rem" }}>Sign Up</h2>
        <p style={{ marginTop: 0, marginBottom: 18, color: "rgba(255,255,255,0.85)" }}>
          Create a new EcoPulse account
        </p>

        <label style={{ display: "block", marginBottom: 8, fontSize: 13, opacity: 0.9 }}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
          style={inputStyle}
        />

        <label style={{ display: "block", marginBottom: 8, fontSize: 13, opacity: 0.9 }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          style={inputStyle}
        />

        <label style={{ display: "block", marginBottom: 8, fontSize: 13, opacity: 0.9 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Sign Up
        </button>

        <div style={{ marginTop: 14, fontSize: 13, color: "rgba(255,255,255,0.75)", textAlign: "center" }}>
          Already have an account?{" "}
          <a href="/" style={{ color: "rgba(255,255,255,0.95)", textDecoration: "underline" }}>
            Sign In
          </a>
        </div>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "none",
  marginBottom: 12,
  outline: "none",
  fontSize: 15,
  background: "rgba(255,255,255,0.06)",
  color: "white",
};

const buttonStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(16,185,129,0.9)",
  background: "rgba(16,185,129,0.9)",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 15,
};

export default SignUpPage;
