import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Transaction from "./pages/Transaction";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import BenjyChat from "./components/BenjyChat";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Analytics />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/transaction" element={<Transactions />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
      <BenjyChat />
    </BrowserRouter>
  );
}

export default App;