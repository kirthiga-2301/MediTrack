import { Link } from "react-router-dom"

function DoctorCard({ doctor, patientCount }) {
  return (
    <Link 
      to={`/doctors/${doctor.id}`}
      className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl px-8 py-6 border border-gray-200 flex items-center justify-between min-h-[120px] mb-4 block"
    >
      <div className="flex items-center gap-5">
        <div
          className={`w-4 h-4 rounded-full ${
            doctor.available
              ? "bg-green-500"
              : "bg-gray-400"
          }`}
        ></div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {doctor.name}
          </h2>

          <p className="text-base text-indigo-600 mt-1">
            {doctor.specialization}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {doctor.experience} Years Experience
          </p>

          <p className="text-sm text-gray-500">
            {patientCount} Assigned Patients
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <span
          className={`px-5 py-2 rounded-full text-sm font-medium ${
            doctor.available
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {doctor.available
            ? "Available"
            : "Unavailable"}
        </span>

        <span className="text-indigo-600 font-bold text-2xl">
          →
        </span>
      </div>
    </Link>
  )
}

export default DoctorCard