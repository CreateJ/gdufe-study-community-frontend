import Vue from "vue";
import Router from "vue-router";

const Home = () => import("@/views/Home/Home");
const Discuss = () => import("@/views/Disscuss/Discuss");
const Register = () => import("@/views/Register/register");
const Login = () => import("@/views/Login/login");
const Personal = () => import("@/views/Personal/personal");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/discuss",
      name: "discuss",
      component: Discuss
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/personal",
      name: "personal",
      component: Personal
    }
  ]
});
