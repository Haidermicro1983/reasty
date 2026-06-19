import React from "react";

export default function Dashboard({ borLeads, applicants }) {
  return (
    <div className="section">
      <h2>Admin Dashboard</h2>

      <h3>BOR Submissions</h3>
      {borLeads.map((lead, i) => (
        <div key={i}>
          <p>{lead.name} - {lead.email}</p>
        </div>
      ))}

      <h3>Applicants</h3>
      {applicants.map((app, i) => (
        <div key={i}>
          <p>{app.name} - {app.email}</p>
        </div>
      ))}
    </div>
  );
}