import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div
          className="flex min-h-full w-full flex-col gap-6 bg-cover bg-fixed bg-no-repeat p-6"
          style={{ backgroundImage: "var(--bg-public)" }}
        ></div>
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Create />} path="/add" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </main>
    </div>
  );
}

export default App;
