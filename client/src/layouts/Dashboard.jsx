import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

function Dashboard() {
  return (
    <div style={{ height: "80vh" }}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
