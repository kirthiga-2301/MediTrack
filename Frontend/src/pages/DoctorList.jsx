import { useEffect, useState } from "react"

import DoctorCard from "../components/DoctorCard"
import Spinner from "../components/Spinner"
import ErrorMessage from "../components/ErrorMessage"

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

      } catch (error) {

        setError("Failed to fetch doctors")

      } finally {

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
    <div className="p-8 md:p-12 w-full max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Doctors Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          View and manage all hospital specialists
        </p>
      </div>

      <div className="flex flex-col gap-4">
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