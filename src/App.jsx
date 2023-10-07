import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from './pages/ProjectDetail';
import ProjectSubmit from "./pages/ProjectSubmit";
import AddUsers from "./pages/AddUsers";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PageProvider, usePageContext } from "./components/PageContext";

function App() {
  return (
    <PageProvider>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/project/:title" element={<ProjectDetail />} />
          <Route path="/new-project" element={<ProjectSubmit />} />
          <Route path="/add-user/:projectTitle" element={<AddUsers />} />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatRoom />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </PageProvider>
  );
}

export default App;