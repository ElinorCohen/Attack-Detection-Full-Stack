import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Register from "./pages/Register/Register";
import Home from "./pages/HomePage/HomePage";
import Profile from "./pages/UserProfile/UserProfile";
import History from "./pages/AttackHistory/AttackHistory";
import About from "./pages/About/About";
import Dashboard from "./layouts/Dashboard";
// import AuthContextProvider from "./contexts/AuthContext";

// import axios from "axios";

function App() {
  return (
    // <AuthContextProvider>
    <RouterProvider router={router} />
    // </AuthContextProvider>
  );
}

export default App;

const router = createBrowserRouter([
  { index: true, element: <Navigate to="/Login" /> },
  { path: "Login", element: <Login /> },
  { path: "ForgotPassword", element: <ForgotPassword /> },
  { path: "ChangePassword", element: <ChangePassword /> },
  { path: "Register", element: <Register /> },
  {
    path: "", // Default route goes to dashboard page.
    element: <Dashboard />,
    children: [
      { path: "Home", element: <Home /> },
      { path: "Profile", element: <Profile /> },
      { path: "History", element: <History /> },
      { path: "About", element: <About /> },
    ],
  },
]);
