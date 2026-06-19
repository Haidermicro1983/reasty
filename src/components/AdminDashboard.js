import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminDashboard() {
  const [view, setView] = useState("dashboard");
  const [borRequests, setBorRequests] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchData = async () => {
    setLoading(true);

    const borSnap = await getDocs(collection(db, "bor_requests"));
    const appSnap = await getDocs(collection(db, "applications"));

    setBorRequests(borSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    setApplications(appSnap.docs.map(d => ({ id: d.id, ...d.data() })));

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= STATUS =================
  const updateStatus = async (col, id, status) => {
    await updateDoc(doc(db, col, id), { status });
    fetchData();
  };

  // ================= LOGOUT =================
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/admin-login";
  };

  return (
    <div className="admin-layout">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">
        <h2>Reasty Admin</h2>

        <button onClick={() => setView("dashboard")}>Dashboard</button>
        <button onClick={() => setView("bor")}>
          BOR ({borRequests.length})
        </button>
        <button onClick={() => setView("app")}>
          Applications ({applications.length})
        </button>

        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* ================= MAIN ================= */}
      <div className="main">

        {/* DASHBOARD HOME */}
        {view === "dashboard" && (
          <div>
            <h1>Dashboard Overview</h1>

            <div className="stats">
              <div className="card">
                <h2>{borRequests.length}</h2>
                <p>BOR Requests</p>
              </div>

              <div className="card">
                <h2>{applications.length}</h2>
                <p>Applications</p>
              </div>

              <div className="card">
                <h2>
                  {borRequests.filter(i => i.status === "Pending").length +
                   applications.filter(i => i.status === "Pending").length}
                </h2>
                <p>Pending</p>
              </div>
            </div>
          </div>
        )}

        {/* BOR */}
        {view === "bor" && (
          <div>
            <h1>BOR Requests</h1>

            {loading ? (
              <p>Loading...</p>
            ) : (
              borRequests.map(item => (
                <div className="card" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.email}</p>
                  <p>{item.company}</p>
                  <p>{item.service}</p>

                  <span className={`status ${item.status || "Pending"}`}>
                    {item.status || "Pending"}
                  </span>

                  <div className="actions">
                    <button onClick={() =>
                      updateStatus("bor_requests", item.id, "Reviewed")
                    }>Review</button>

                    <button onClick={() =>
                      updateStatus("bor_requests", item.id, "Approved")
                    }>Approve</button>

                    <button onClick={() =>
                      updateStatus("bor_requests", item.id, "Rejected")
                    }>Reject</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* APPLICATIONS */}
        {view === "app" && (
          <div>
            <h1>Applications</h1>

            {loading ? (
              <p>Loading...</p>
            ) : (
              applications.map(item => (
                <div className="card" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.email}</p>
                  <p>{item.role}</p>
                  <p>{item.experience}</p>

                  <span className={`status ${item.status || "Pending"}`}>
                    {item.status || "Pending"}
                  </span>

                  <div className="actions">
                    <button onClick={() =>
                      updateStatus("applications", item.id, "Reviewed")
                    }>Review</button>

                    <button onClick={() =>
                      updateStatus("applications", item.id, "Approved")
                    }>Approve</button>

                    <button onClick={() =>
                      updateStatus("applications", item.id, "Rejected")
                    }>Reject</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}