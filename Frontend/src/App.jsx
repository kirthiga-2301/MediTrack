import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import DoctorList from "./pages/DoctorList"
import DoctorDetail from "./pages/DoctorDetail"
import AddDoctor from "./pages/AddDoctor"
import AddPatient from "./pages/AddPatient"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/doctors" />}
        />

        <Route
          path="/doctors"
          element={<DoctorList />}
        />

        <Route
          path="/doctors/add"
          element={<AddDoctor />}
        />

        <Route
          path="/patients/add"
          element={<AddPatient />}
        />

        <Route
          path="/doctors/:id"
          element={<DoctorDetail />}
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App