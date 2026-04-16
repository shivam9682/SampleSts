import React from "react";
import "./FeatureSection.css";

function FeatureSection() {
  const features = [
    { icon: "📚", title: "Book Management", desc: "Add, update, delete and organize books easily." },
    { icon: "👤", title: "User Management", desc: "Manage students, staff and memberships." },
    { icon: "🔄", title: "Issue & Return", desc: "Track issued books and due dates." },
    { icon: "🔍", title: "Search System", desc: "Find books by title, author or category." },
    { icon: "📊", title: "Reports", desc: "Generate reports and analytics." },
    { icon: "💻", title: "Digital Library", desc: "Access books online anytime." }
  ];

  return (
    <section className="feature-section">
      

        <div className="section-header">
          <h2>Library Management Features</h2>
          <p>Powerful tools to manage your library efficiently</p>
        </div>

        {/* 🔥 FLEXBOX */}
        <div className="feature-flex">
          {features.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      
    </section>
  );
}

export default FeatureSection;