import { useEffect, useState } from "react"

import DoctorCard from "../components/DoctorCard"
import Spinner from "../components/Spinner"
import ErrorMessage from "../components/ErrorMessage"
import Sidebar from "../components/Sidebar"

import { fetchDoctors } from "../services/api"

function DoctorList() {

  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {

    async function getDoctorsData() {

      try {

        const data = await fetchDoctors()

        setDoctors(data)

      }

      catch (error) {

        setError("Failed to fetch doctors")

      }

      finally {

        setLoading(false)

      }

    }

    getDoctorsData()

  }, [])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh"
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >

        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#111827",
            marginBottom: "30px"
          }}
        >
          MediTrack
        </h1>

        {
          doctors.map((doctor) => (

            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              patientCount={doctor.patient_count || 0}
            />

          ))
        }

      </div>

    </div>

  )

}

export default DoctorList