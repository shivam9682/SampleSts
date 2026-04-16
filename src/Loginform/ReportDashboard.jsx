
import { useEffect, useState } from "react";
import axios from "axios";
import "./RepoertDashboard.css";

export default function ReportsDashboard() {
  const [dashboardData, setDashboardData] = useState({
    dailyIssuedBooks: 0,
    dailyReturnedBooks: 0,
    monthlyStudentRegistrations: 0,
    totalFineCollected: 0,
  });

  const [mostIssuedBooks, setMostIssuedBooks] = useState([]);
  const [mostActiveStudents, setMostActiveStudents] = useState([]);
  const [lowStockBooks, setLowStockBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const dashboardRes = await axios.get(
        "http://localhost:8081/api/reports/dashboard"
      );

      const issuedBooksRes = await axios.get(
        "http://localhost:8081/api/reports/most-issued-books"
      );

      const activeStudentsRes = await axios.get(
        "http://localhost:8081/api/reports/most-active-students"
      );

      const lowStockRes = await axios.get(
        "http://localhost:8081/api/reports/low-stock-books"
      );

      setDashboardData(dashboardRes.data);

      setMostIssuedBooks(
        issuedBooksRes.data.map((item) => ({
          title: item[0],
          count: item[1],
        }))
      );

      setMostActiveStudents(
        activeStudentsRes.data.map((item) => ({
          email: item[0],
          total: item[1],
        }))
      );

      setLowStockBooks(lowStockRes.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportExcel = () => {
    window.open("http://localhost:8081/api/reports/export-excel", "_blank");
  };

  const exportPdf = () => {
    window.open("http://localhost:8081/api/reports/export-pdf", "_blank");
  };

  if (loading) {
    return <div className="loading-screen">Loading Reports...</div>;
  }

  return (
    <div className="reports-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>Library Reports Dashboard</h1>
            <p>Advanced analytics and reporting panel</p>
          </div>

          <div className="dashboard-actions">
            <button onClick={exportExcel} className="export-excel">
              Export Excel
            </button>

            <button onClick={exportPdf} className="export-pdf">
              Export PDF
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p>Daily Issued Books</p>
            <h2 className="blue-text">{dashboardData.dailyIssuedBooks}</h2>
          </div>

          <div className="stat-card">
            <p>Daily Returned Books</p>
            <h2 className="green-text">{dashboardData.dailyReturnedBooks}</h2>
          </div>

          <div className="stat-card">
            <p>Monthly Registrations</p>
            <h2 className="yellow-text">
              {dashboardData.monthlyStudentRegistrations}
            </h2>
          </div>

          <div className="stat-card">
            <p>Fine Collection</p>
            <h2 className="red-text">
              ₹{dashboardData.totalFineCollected}
            </h2>
          </div>
        </div>

        <div className="reports-grid">
          <div className="report-card">
            <div className="report-header">
              <h2>Most Issued Books</h2>
              <span>Top Books</span>
            </div>

            <div className="report-list">
              {mostIssuedBooks.map((book, index) => (
                <div key={index} className="report-item">
                  <div>
                    <h3>{book.title}</h3>
                    <p>Book Popularity</p>
                  </div>

                  <div className="blue-badge">{book.count}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="report-card">
            <div className="report-header">
              <h2>Most Active Students</h2>
              <span>Top Readers</span>
            </div>

            <div className="report-list">
              {mostActiveStudents.map((student, index) => (
                <div key={index} className="report-item">
                  <div>
                    <h3>{student.email}</h3>
                    <p>Books Borrowed</p>
                  </div>

                  <div className="green-badge">{student.total}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="low-stock-card">
          <div className="low-stock-header">
            <h2>Low Stock Books</h2>
            <span>Need Restock</span>
          </div>

          <div className="table-wrapper">
            <table className="low-stock-table">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Available Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {lowStockBooks.map((book, index) => (
                  <tr key={index}>
                    <td>{book.title}</td>
                    <td>{book.quantity}</td>
                    <td>
                      <span className="low-stock-badge">Low Stock</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

