import "./styles/reset.css";
import Login from "./pages/Login";
import Signup from "./pages/signup/Signup";
import CheckYourEmail from "./pages/signup/CheckYourEmail";
import EmailInput from "./pages/signup/EmailInput";
import BuildProgress from "./pages/BuildProgress";
import MyProject from "./pages/MyProject";
import ProjectDatailCheck from "./pages/ProjectDatail";
import Main from "./pages/main_page/MainPage";
import Main_2 from "./pages/main_page/MainPage_2";
import Main_3 from "./pages/main_page/MainPage_3";
import Main_4 from "./pages/main_page/MainPage_4";
import NewProjectDatail from "./pages/newProjectDetail";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./layouts/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/emailInput" element={<EmailInput />} />
      <Route path="/checkEmail" element={<CheckYourEmail />} />
      <Route
        path="/build-progress"
        element={
          <ProtectedRoute>
            <BuildProgress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myproject"
        element={
          <ProtectedRoute>
            <MyProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project-detail/:id"
        element={
          <ProtectedRoute>
            <ProjectDatailCheck />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-project-detail/:id"
        element={
          <ProtectedRoute>
            <NewProjectDatail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main-2"
        element={
          <ProtectedRoute>
            <Main_2 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main-3"
        element={
          <ProtectedRoute>
            <Main_3 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main-4"
        element={
          <ProtectedRoute>
            <Main_4 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main-modify"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main-md-2"
        element={
          <ProtectedRoute>
            <Main_2 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main-md-3"
        element={
          <ProtectedRoute>
            <Main_3 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main-md-4"
        element={
          <ProtectedRoute>
            <Main_4 />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
