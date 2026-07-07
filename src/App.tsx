import "./styles/reset.css";
import Login from "./pages/Login";
import Signup from "./pages/signup/Signup";
import CheckYourEmail from "./pages/signup/CheckYourEmail";
import EmailInput from "./pages/signup/EmailInput";
import BuildProgress from "./pages/BuildProgress";
import MyProject from "./pages/MyProject";
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
      <Route path="/build-progress/:projectId" element={<BuildProgress />} />
      <Route path="/project-detail/:id" element={<ProjectDatailCheck />} />
      <Route path="/new-project-detail/:id" element={<NewProjectDatail />} />

      <Route path="/main" element={<Main />} />
      <Route path="/main-2" element={<Main_2 />} />
      <Route path="/main-3" element={<Main_3 />} />
      <Route path="/main-4" element={<Main_4 />} />
      <Route path="/main-modify" element={<Main />} />
      <Route path="/main-md-2" element={<Main_2 />} />
      <Route path="/main-md-3" element={<Main_3 />} />
      <Route path="/main-md-4" element={<Main_4 />} />

      <Route
        path="/myproject"
        element={
          <ProtectedRoute>
            <MyProject />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
