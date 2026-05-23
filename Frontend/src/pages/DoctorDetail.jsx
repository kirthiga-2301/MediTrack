import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import Sidebar from "../components/Sidebar"
import Spinner from "../components/Spinner"
import ErrorMessage from "../components/ErrorMessage"

import {
  fetchDoctorById,
  fetchDoctorPatients
} from "../services/api"

function DoctorDetail() {

  const { id } = useParams()

  const [doctor, setDoctor] = useState(null)
  const [patients, setPatients] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {

    async function loadDoctorData() {

      try {

        const doctorData = await fetchDoctorById(id)
        const patientsData = await fetchDoctorPatients(id)

        setDoctor(doctorData)
        setPatients(patientsData)

      }

      catch (error) {

        setError("Failed to fetch doctor details")

      }

      finally {

        setLoading(false)

      }

    }

    loadDoctorData()

  }, [id])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!doctor) {
    return <ErrorMessage message="Doctor not found" />
  }

  return (

    <div
      style={{
        display: "flex",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh"
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "40px"
        }}
      >

        <Link
          to="/doctors"
          style={{
            textDecoration: "none",
            color: "#4f46e5",
            fontWeight: "600"
          }}
        >
          ← Back to all doctors
        </Link>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "40px",
            marginTop: "30px",
            marginBottom: "40px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.08)"
          }}
        >

          <h1
            style={{
              fontSize: "28px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "10px"
            }}
          >
            {doctor.name}
          </h1>

          <p
            style={{
              color: "#4f46e5",
              fontSize: "18px",
              marginBottom: "20px"
            }}
          >
            {doctor.specialization}
          </p>

          <p
            style={{
              marginBottom: "10px"
            }}
          >
            Experience: {doctor.experience} Years
          </p>

          <p
            style={{
              fontWeight: "600",
              color: doctor.available
                ? "green"
                : "gray"
            }}
          >
            {
              doctor.available
                ? "Available"
                : "Unavailable"
            }
          </p>

        </div>

        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "20px"
          }}
        >
          Assigned Patients
        </h2>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.08)"
          }}
        >

          {
            patients.map((patient) => (

              <div
                key={patient.id}

                onClick={() => {

                  alert(
`Patient Name: ${patient.name}

Age: ${patient.age}

Blood Group: ${patient.blood_group}

Condition: ${patient.condition}`
                  )

                }}

                style={{
                  borderBottom: "1px solid #e5e7eb",
                  padding: "15px 0",
                  cursor: "pointer"
                }}
              >

                <h3 style={{ fontSize: "18px", color: "#1f2937", marginBottom: "8px", fontWeight: "600" }}>
                  {patient.name}
                </h3>

                <p style={{ fontSize: "15px", color: "#4b5563", marginBottom: "4px" }}>
                  <span style={{ fontWeight: "500", color: "#374151" }}>Age:</span> {patient.age}
                </p>

                <p style={{ fontSize: "15px", color: "#4b5563", marginBottom: "4px" }}>
                  <span style={{ fontWeight: "500", color: "#374151" }}>Blood Group:</span> {patient.blood_group}
                </p>

                <p style={{ fontSize: "15px", color: "#4b5563" }}>
                  <span style={{ fontWeight: "500", color: "#374151" }}>Condition:</span> {patient.condition}
                </p>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  )

}

export default DoctorDetail