import { Link } from "react-router-dom"

function DoctorCard({ doctor, patientCount }) {

  return (

    <Link
      to={`/doctors/${doctor.id}`}

      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block"
      }}
    >

      <div

        style={{

          backgroundColor: "white",

          borderRadius: "24px",

          padding: "35px",

          marginBottom: "30px",

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          boxShadow: "0px 2px 10px rgba(0,0,0,0.08)",

          cursor: "pointer",

          transition: "transform 0.2s, box-shadow 0.2s"
        }}

        onMouseEnter={(e) => {

          e.currentTarget.style.transform = "translateY(-2px)";

          e.currentTarget.style.boxShadow =
            "0px 4px 15px rgba(0,0,0,0.12)";
        }}

        onMouseLeave={(e) => {

          e.currentTarget.style.transform = "translateY(0)";

          e.currentTarget.style.boxShadow =
            "0px 2px 10px rgba(0,0,0,0.08)";
        }}
      >

        <div
          style={{

            display: "flex",

            alignItems: "center",

            gap: "20px"
          }}
        >

          <div
            style={{

              width: "16px",

              height: "16px",

              borderRadius: "50%",

              backgroundColor: doctor.available
                ? "#22c55e"
                : "#9ca3af"
            }}
          ></div>

          <div>

            <h2
              style={{

                fontSize: "28px",

                fontWeight: "700",

                color: "#111827",

                marginBottom: "8px"
              }}
            >

              {doctor.name}

            </h2>

            <p
              style={{

                color: "#4f46e5",

                fontSize: "22px",

                marginBottom: "15px"
              }}
            >

              {doctor.specialization}

            </p>

            <div
              style={{

                display: "flex",

                gap: "30px",

                color: "#6b7280",

                fontSize: "18px"
              }}
            >

              <p>

                {doctor.experience} Years Experience

              </p>

              <p>

                {patientCount} Assigned Patients

              </p>

            </div>

          </div>

        </div>

        <div
          style={{

            display: "flex",

            alignItems: "center",

            gap: "20px"
          }}
        >

          <span
            style={{

              backgroundColor: doctor.available
                ? "#dcfce7"
                : "#e5e7eb",

              color: doctor.available
                ? "#15803d"
                : "#374151",

              padding: "14px 26px",

              borderRadius: "999px",

              fontWeight: "600",

              fontSize: "18px"
            }}
          >

            {
              doctor.available
                ? "Available"
                : "Unavailable"
            }

          </span>

          <span
            style={{

              color: "#4f46e5",

              fontSize: "28px",

              fontWeight: "bold"
            }}
          >

            →

          </span>

        </div>

      </div>

    </Link>

  )

}

export default DoctorCard