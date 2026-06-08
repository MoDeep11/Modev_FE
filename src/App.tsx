import "./styles/reset.css";
import Main_2 from "../src/pages/main_page/MainPage_2";
import Main from "../src/pages/main_page/MainPage";
import Main_3 from "../src/pages/main_page/MainPage_3"
import Main_4 from "../src/pages/main_page/MainPage_4"
import End from "../src/pages/BuildProgress"
import { Routes, Route } from "react-router-dom";


function App() {
  return (

    <Routes>
      <Route path="/Main" element={<Main_3 />} />
      <Route path="/Main_3" element={<Main_2 />} />
      <Route path="/Main_2" element={<Main />} />
      <Route path="/Main_4" element={<Main_4 />}/>
      <Route path="/End" element={<End />}/>
    </Routes> 
  );
}

export default App;
