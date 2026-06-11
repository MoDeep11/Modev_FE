import "./styles/reset.css";
import Login from "./pages/Login";
import Signup from "./pages/signup/Signup";
import BuildProgress from "./pages/BuildProgress";
import MyProject from "./pages/MyProject";
import ProjectDatailCheck from "./pages/ProjectDatailCheck";
import Main from "./pages/main_page/MainPage";
import Main_2 from "./pages/main_page/MainPage_2";
import Main_3 from "./pages/main_page/MainPage_3";
import Main_4 from "./pages/main_page/MainPage_4";
<<<<<<< Updated upstream
import CheckYourEmail from "./pages/signup/CheckYourEmail";
import EmailInput from "./pages/signup/EmailInput";
=======
>>>>>>> Stashed changes
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
<<<<<<< Updated upstream
      <Route path="/emailInput" element={<EmailInput />} />
      <Route path="/checkEmail" element={<CheckYourEmail />}></Route>
=======
>>>>>>> Stashed changes
      <Route path="/build-progress" element={<BuildProgress />} />
      <Route path="/myproject" element={<MyProject />} />
      <Route path="/project-detail" element={<ProjectDatailCheck />} />
      <Route path="/main" element={<Main />} />
      <Route path="/main-2" element={<Main_2 />} />
      <Route path="/main-3" element={<Main_3 />} />
      <Route path="/main-4" element={<Main_4 />} />
      <Route path="/main-modify" element={<Main />} />
      <Route path="/main-md-2" element={<Main_2 />} />
      <Route path="/main-md-3" element={<Main_3 />} />
      <Route path="/main-md-4" element={<Main_4 />} />
    </Routes>
  );
}

export default App;
