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

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
        Our Medical Specialists
      </h1>

      <div className="flex flex-col gap-4 max-w-5xl mx-auto">

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