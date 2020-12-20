import Vue from "vue";
import Router from "vue-router";

const Home = () => import("@/views/Home/Home");
const Discuss = () => import("@/views/Discuss/Discuss");
const Register = () => import("@/views/Register/register");
const Login = () => import("@/views/Login/login");
const Personal = () => import("@/views/Personal/personal");
const Message = () => import("@/views/Message/message");
const Null = () => import("@/views/Null/null");
const Test = () => import("@/views/Test/test");
const Info = () => import("@/views/Info/info");

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
      path: "/discuss/:postId",
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
    },
    {
      path: "/message",
      name: "message",
      component: Message
    },
    {
      path: "/null",
      name: "null",
      component: Null
    },
    {
      path: "/test",
      name: "test",
      component: Test
    },
    {
      path: "/info",
      name: "info",
      component: Info
    }
  ]
});
