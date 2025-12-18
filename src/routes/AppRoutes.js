import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage } from "../login/login"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
