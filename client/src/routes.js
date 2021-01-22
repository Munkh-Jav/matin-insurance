
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Appointments from "views/examples/Appointments.js";
import Comments from "views/examples/Comments.js";
import Settings from "views/examples/Settings.js";
import Icons from "views/examples/Icons.js";
import Videos from "views/examples/Videos.js";
import AllVideos from "./views/examples/VideoList";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/appointments",
    name: "Appointments",
    icon: "ni ni-bullet-list-67 text-red",
    component: Appointments,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "ni ni-single-02 text-yellow",
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/comments",
    name: "Appointments",
    icon: "ni ni-bullet-list-67 text-red",
    component: Comments,
    layout: "/admin"
  },
  {
    path: "/videos",
    name: "Videos",
    icon: "ni ni-bullet-list-67 text-red",
    component: Videos,
    layout: "/admin"

  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/forgot",
    name: "Forgot Password",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/list",
    name: "Videos",
    icon: "ni ni-circle-08 text-pink",
    component: AllVideos,
    layout: "/video"
  }
];
export default routes;
