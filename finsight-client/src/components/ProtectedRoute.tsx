import { Navigate, Outlet } from "react-router-dom"

type props = {
  children: React.ReactNode
}

export default function ProtectedRoute ({children} : props) {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" />
  }

  return <Outlet />;
}