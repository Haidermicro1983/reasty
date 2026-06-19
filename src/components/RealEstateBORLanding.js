// FILE: src/components/RealEstateBORLanding.js
import React, { useState } from "react";
import "../assets/style.css";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

export default function RealEstateBORLanding() {
  const [step, setStep] = useState(1);
  const [view, setView] = useState("bor");
  const [loading, setLoading] = useState(false);
  const [borLoading, setBorLoading] = useState(false);

  // ================= BOR FORM =================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    service: "",
    state: "",
    file: null,
  });

  // ================= APPLY FORM =================
  const [applyData, setApplyData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    resume: null,
  });

  // ================= BOR HANDLERS =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email) {
        alert("Please enter name and email");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      setBorLoading(true);

      let fileURL = "";

      if (formData.file) {
        const storageRef = ref(
          storage,
          `bor_documents/${Date.now()}_${formData.file.name}`
        );

        const snapshot = await uploadBytes(storageRef, formData.file);
        fileURL = await getDownloadURL(snapshot.ref);
      }

      const { file, ...cleanData } = formData;

      await addDoc(collection(db, "bor_requests"), {
        ...cleanData,
        fileURL,
        createdAt: serverTimestamp(),
      });

      alert("BOR Submitted!");

      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        service: "",
        state: "",
        file: null,
      });

      setStep(1);
    } catch (error) {
      console.error("Firebase Error:", error);
      alert(error.message);
    } finally {
      setBorLoading(false);
    }
  };

  // ================= APPLY HANDLERS =================
  const handleApplyChange = (e) => {
    const { name, value, files } = e.target;

    setApplyData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleApplySubmit = async () => {
    try {
      if (!applyData.name || !applyData.email || !applyData.role) {
        alert("Please fill required fields");
        return;
      }

      setLoading(true);

      let resumeURL = "";

      if (applyData.resume) {
        const storageRef = ref(
          storage,
          `applications/${Date.now()}_${applyData.resume.name}`
        );

        const snapshot = await uploadBytes(storageRef, applyData.resume);
        resumeURL = await getDownloadURL(snapshot.ref);
      }

      const { resume, ...cleanData } = applyData;

      await addDoc(collection(db, "applications"), {
        ...cleanData,
        resumeURL,
        createdAt: serverTimestamp(),
      });

      alert("Application Submitted!");

      setApplyData({
        name: "",
        email: "",
        phone: "",
        role: "",
        experience: "",
        resume: null,
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing">
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <h2
              className="logo"
              onClick={() => {
                setView("bor");
                setStep(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Reasty
            </h2>
          </div>

          <div className="nav-right">
            <button
              className={`nav-link ${view === "bor" ? "active" : ""}`}
              onClick={() => {
                setView("bor");
                setStep(1);
              }}
            >
              BOR
            </button>

            <button
              className={`nav-link ${view === "apply" ? "active" : ""}`}
              onClick={() => setView("apply")}
            >
              Join Team
            </button>

            <button
              className="nav-cta"
              onClick={() => {
                setView("bor");
                setStep(1);
              }}
            >
              Get Started
            </button>

            <Link to="/admin-login" className="admin-btn">
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1>Broker of Record Services</h1>
        <p>Serving MI, IL, NE, OH, TN</p>
      </section>

      {/* ================= BOR FORM ================= */}
      {view === "bor" && (
        <section className="form-section">
          <h2>
            {formData.service
              ? `BOR Request – ${formData.service}`
              : "Submit a BOR Request"}
          </h2>

          <div className="form">
            {step === 1 && (
              <>
                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <button onClick={nextStep}>Next</button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                />

                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="">Select Role</option>
                  <option>Agent</option>
                  <option>Broker</option>
                </select>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select Service *</option>
                  <option>ROS</option>
                  <option>Property Management</option>
                  <option>Commercial</option>
                </select>

                <input
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                />

                <button onClick={() => setStep(1)}>Back</button>
                <button onClick={nextStep}>Next</button>
              </>
            )}

            {step === 3 && (
              <>
                <input type="file" name="file" onChange={handleChange} />

                <button onClick={() => setStep(2)}>Back</button>

                <button onClick={handleSubmit} disabled={borLoading}>
                  {borLoading ? "Submitting..." : "Submit"}
                </button>
              </>
            )}
          </div>
        </section>
      )}

      {/* ================= APPLY FORM ================= */}
      {view === "apply" && (
        <section className="form-section">
          <h2>Join Our Team</h2>

          <div className="form">
            <input
              name="name"
              placeholder="Full Name"
              value={applyData.name}
              onChange={handleApplyChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={applyData.email}
              onChange={handleApplyChange}
            />

            <input
              name="phone"
              placeholder="Phone"
              value={applyData.phone}
              onChange={handleApplyChange}
            />

            <select
              name="role"
              value={applyData.role}
              onChange={handleApplyChange}
            >
              <option value="">Select Position *</option>
              <option>Agent</option>
              <option>Broker</option>
            </select>

            <input
              name="experience"
              placeholder="Experience"
              value={applyData.experience}
              onChange={handleApplyChange}
            />

            <input type="file" name="resume" onChange={handleApplyChange} />

            <button onClick={handleApplySubmit} disabled={loading}>
              {loading ? "Submitting..." : "Apply"}
            </button>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Reasty</p>
      </footer>
    </div>
  );
}