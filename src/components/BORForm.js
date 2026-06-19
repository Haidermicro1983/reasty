import React, { useState } from "react";

export default function BORForm({ onSubmit }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    file: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData({
      ...data,
      [name]: files ? files[0] : value
    });
  };

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const submit = () => {
    onSubmit(data);
  };

  return (
    <div className="form">

      {step === 1 && (
        <>
          <h3>Step 1: Basic Info</h3>
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <button onClick={next}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Step 2: Business Info</h3>
          <input name="company" placeholder="Company" onChange={handleChange} />
          <select name="role" onChange={handleChange}>
            <option>Agent</option>
            <option>Broker</option>
            <option>Manager</option>
          </select>
          <button onClick={back}>Back</button>
          <button onClick={next}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <h3>Step 3: Upload Document</h3>
          <input type="file" name="file" onChange={handleChange} />
          <button onClick={back}>Back</button>
          <button onClick={submit}>Submit</button>
        </>
      )}

    </div>
  );
}