import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const menuRef = useRef(null);
  useEffect(() => {
  if (mobileMenuOpen) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
  } else {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
  }

  return () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
  };
}, [mobileMenuOpen]);
useEffect(() => {
  const syncUser = () => {
    const loggedUser = localStorage.getItem("user");
    const adminData = localStorage.getItem("admin");

    setUser(loggedUser ? JSON.parse(loggedUser) : null);
    setAdmin(adminData && adminData !== "false" ? JSON.parse(adminData) : null);
  };

  window.addEventListener("storage", syncUser);
  window.addEventListener("popstate", syncUser);

  return () => {
    window.removeEventListener("storage", syncUser);
    window.removeEventListener("popstate", syncUser);
  };
}, []);

useEffect(() => {
  const handleClickOutsideMenu = (event) => {
    if (
      mobileMenuOpen &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMobileMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutsideMenu);

  return () => {
    document.removeEventListener("mousedown", handleClickOutsideMenu);
  };
}, [mobileMenuOpen]);


useEffect(() => {
  setMobileMenuOpen(false);
}, [location]);


  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    const adminData = localStorage.getItem('admin');

    try {
      if (loggedUser) setUser(JSON.parse(loggedUser));
      else setUser(null);
    } catch {
      setUser(null);
    }

    try {
      if (adminData && adminData !== "false") setAdmin(JSON.parse(adminData));
      else setAdmin(null);
    } catch {
      setAdmin(null);
    }
  }, [location]);
  useEffect(() => {
  setShowProfileMenu(false);
}, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('isAuth');

    setUser(null);
    setAdmin(null);

    navigate('/logindashboard');
  };

  const getProfileImage = () => {
    if (!user?.photo) return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

    if (user.photo.startsWith('http')) return user.photo;

    if (user.photo.startsWith('uploads/')) {
      return `http://localhost:8081/${user.photo}`;
    }

    return `http://localhost:8081/uploads/${user.photo}`;
  };

  const profileImage = getProfileImage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
useEffect(() => {
  const handleBackButton = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/logindashboard", { replace: true });
    }
  };

  window.addEventListener("popstate", handleBackButton);

  return () => {
    window.removeEventListener("popstate", handleBackButton);
  };
}, []);
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">LibraSys</span>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <div 
  className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} 
  ref={menuRef}
></div>

          {/* Guest Navbar */}
          {!user && !admin && (
            <>
              <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>

              <Link to="/showbooks" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Books
              </Link>

              <Link to="/studentmain" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Members
              </Link>

              <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>

              <Link to="/logindashboard" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-outline">Login</button>
              </Link>

              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-outline">Register</button>
              </Link>
            </>
          )}

          {/* User Navbar After Login */}
          {user && !admin && (
            <>
              <Link to="/userdashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>

              <Link to="/availablebooks" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Available Books
              </Link>

              <Link to="/borrowedBook" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                My Books
              </Link>

              <Link to="/userhistory" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                History
              </Link>

              <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Help
              </Link>

              <div className="profile-wrapper" ref={dropdownRef}>
                <div
                  className="profile-box"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <img
                    src={profileImage}
                    alt="profile" 
                    className="profile-img"
                    onError={(e) => {
                      e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
                    }}
                  />
                </div>

                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <div className="profile-arrow"></div>

                    <div className="profile-header">
                      <img
                        src={profileImage}
                        alt="profile"
                        className="profile-large-img"
                        onError={(e) => {
                          e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
                        }}
                      />
                       
                      
                      <h4>{user?.name || 'User Name'}</h4>
                      <p>{user?.email || 'No Email'}</p>
                    </div>

                    <div className="profile-details">
                      <p>
                        <strong>Class:</strong>{' '}
                        <span>{user?.studentClass || 'N/A'}</span>
                      </p>
                      <p>
                        <strong>Department:</strong>{' '}
                        <span>{user?.department || 'N/A'}</span>
                      </p>
                      <p>
                        <strong>Semester:</strong>{' '}
                        <span>{user?.semester || 'N/A'}</span>
                      </p>
                    </div>

                    <Link to="/profile">
                      <button className="profile-btn">
                        View Full Profile
                      </button>
                    </Link>
                      
                       <Link to="/membershipcard">
                      <button className="profile-btn">
                        View Id-Card
                      </button>
                    </Link>

                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Admin Navbar */}
          {admin && (
            <>
              <span
                style={{
                  color: '#f87171',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                👤 {admin?.email || 'Admin'} 🛠️ Admin
              </span>

              <Link to="/adminlibrarypage" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-outline">Dashboard</button>
              </Link>

              <Link to="/addbook" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-outline">Add Book</button>
              </Link>

              <Link to="/studentlist" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-outline">Students</button>
              </Link>

              <Link to="/reportdashboard" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-outline">Reports</button>
              </Link>

              <button className="btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
}   