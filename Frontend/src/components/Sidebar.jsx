import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { fetchDoctors } from "../services/api"
import "./Sidebar.css"

function Sidebar() {
  const [doctors, setDoctors] = useState([])

  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    async function loadDoctors() {
      try {
        const data = await fetchDoctors()
        setDoctors(data)
      } catch (err) {
        console.error("Failed to load doctors for sidebar")
      }
    }
    loadDoctors()
  }, [])

  return (
    <div className="sidebar">
      <div>
        <h1 className="logo">
          MediTrack
        </h1>
        <p className="portal-text">
          ADMIN PORTAL
        </p>

        <NavLink 
          to="/doctors" 
          end
          className={({ isActive }) => isActive ? "menu-item active-menu" : "menu-item"}
        >
          <span>✨</span>
          <span>All Doctors</span>
        </NavLink>

        <div 
          className="sidebar-section-title"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ 
            cursor: "pointer", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            paddingRight: "10px"
          }}
        >
          <span>SPECIALIZATION</span>
          <span style={{ fontSize: "10px" }}>{isExpanded ? "▼" : "▶"}</span>
        </div>

        {isExpanded && (
          <div className="doctors-list">
            {doctors.map(doc => (
              <NavLink 
                key={doc.id}
                to={`/doctors/${doc.id}`}
                className={({ isActive }) => isActive ? "doc-item active-doc" : "doc-item"}
              >
                <div className={`status-dot ${doc.available ? 'available' : 'unavailable'}`}></div>
                <span className="doc-name">{doc.specialization}</span>
              </NavLink>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Sidebar