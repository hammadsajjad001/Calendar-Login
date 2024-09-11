import { EventProvider } from "./components/EventContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Permissions from "./Permissions";
import Roles from "./Roles";
import User from "./User";
import CalendarRouting from "./components/CalandarRouting";
import Navbar from "../../client/src/components/Dashboard/NavBarFolder/NavBarComponent";
import Sidebar from "./Sidebar";

export default function AppWrapper() {
  return(
    <Router>
      <App/>
    </Router>
  )
}

function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/" || location.pathname === "/signup";
  return (
    <div className="app">
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <Sidebar />}
      <EventProvider>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/permissions" element={<Permissions />}></Route>
            <Route path="/roles" element={<Roles />}></Route>
            <Route path="/usertab" element={<User />}></Route>
            <Route path="/calendar" element={<CalendarRouting />}></Route>
            <Route path="/home/*" element={<Home />}></Route>
          </Routes>
      </EventProvider>
    </div>
  );
}
