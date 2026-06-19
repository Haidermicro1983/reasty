import React, { useState } from "react";

export default function ApplyForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    experience: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form">
      <h2>Join Reasty</h2>

      <input name="name" placeholder="Full Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="experience" placeholder="Years of Experience" onChange={handleChange} />

      <button onClick={() => onSubmit(form)}>Apply</button>
    </div>
  );
}