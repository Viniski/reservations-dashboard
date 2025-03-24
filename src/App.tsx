import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Edit from "./pages/edit/Edit";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Create />} path="/add" />
          <Route element={<Edit />} path="/edit/:id" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </main>
    </div>
  );
}

export default App;
