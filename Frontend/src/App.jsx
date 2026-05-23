import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import DoctorList from "./pages/DoctorList"
import DoctorDetail from "./pages/DoctorDetail"

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
          path="/doctors/:id"
          element={<DoctorDetail />}
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App