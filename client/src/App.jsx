import { EventProvider } from "./components/EventContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Permissions from "./Permissions";
import Roles from "./Roles";
import User from "./User";
export default function App() {
  return (
    <EventProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/permissions" element={<Permissions />}></Route>
          <Route path="/roles" element={<Roles />}></Route>
          <Route path="/usertab" element={<User />}></Route>
          <Route path="/home/*" element={<Home />}></Route>
        </Routes>
      </Router>
    </EventProvider>
  );
}
