import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Main from "./components/Main";
import Login from "./Loginform/Login";
import Register from "./Loginform/Register";
import Contact from "./components/Contact";
import LoginDashBoard from "./Loginform/LoginDashbaord";

// Protected Route
import ProtectedRoute from "./Loginform/ProtectedRoute";

// Protected Pages
import AvailableBooks from "./Loginform/AvailableBooks";
import BorrowedBooks from "./Loginform/BorrowedBooks";
import UserDashboard from "./Loginform/UserDashboard";
import UserHistory from "./Loginform/UserHistory";
import Profile from "./Loginform/Profile";
import MembershipCard from "./Loginform/MembershipCard";
import ShowBooks from "./Loginform/ShowBooks";
import Studentmain from "./Loginform/Studentmain";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import AdminLibraryPage from "./Loginform/AdminLibraryPage";
import StudentList from "./Loginform/StudentList";
import AdminReport from "./Loginform/AdminReport";
import AdminLogin from "./Loginform/AdminLogin"
import BookDetails from "./Loginform/BookDetails";
function App() {
  const location = useLocation();

  // ❌ Hide navbar on login pages (optional clean UI)
  const hideLayout =
    location.pathname === "/logindashboard" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="App">

      {!hideLayout && <Navbar />}

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Main />} />
        <Route path="/logindashboard" element={<LoginDashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/showbooks" element={<ShowBooks />} />
        <Route path="/studentmain" element={<Studentmain />} />

        {/* 🔥 PROTECTED ROUTES (LOGIN REQUIRED) */}
        <Route
          path="/availablebooks"
          element={
            <ProtectedRoute>
              <AvailableBooks />
            </ProtectedRoute>
          }
        />

       


        <Route 
        path="/adminLogin"
        element = {
          <ProtectedRoute>
          <AdminLogin/>
          </ProtectedRoute>
        }
        />

        <Route
          path="/borrowedBook"
          element={
            <ProtectedRoute>
              <BorrowedBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userhistory"
          element={
            <ProtectedRoute>
              <UserHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/membershipcard"
          element={
            <ProtectedRoute>
              <MembershipCard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booklist"
          element={
            <ProtectedRoute>
              <BookList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addbook"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminlibrarypage"
          element={
            <ProtectedRoute>
              <AdminLibraryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/studentlist"
          element={
            <ProtectedRoute>
              <StudentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminreport"
          element={
            <ProtectedRoute>
              <AdminReport />
            </ProtectedRoute>
          }
        />

      </Routes>

      {!hideLayout && <Footer />}

    </div>
  );
}

export default App;