import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavbarComp";
import { AuthProvider } from "./context/AuthContext";
import ChatRoom from "./pages/ChatRoom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from './pages/ProjectDetail';
import ProjectSubmit from "./pages/ProjectSubmit";
import AddUsers from "./pages/AddUsers";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PageProvider, usePageContext } from "./components/PageContext";
import ContactForm from "./pages/ContactForm";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <PageProvider>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/project/:title" element={<ProjectDetail />} />
          <Route path="/new-project" element={<ProjectSubmit />} />
          <Route path="/add-user/:projectTitle" element={<AddUsers />} />
          <Route path="/contact/:projectTitle" element={<ContactForm />} />
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
