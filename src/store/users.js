import router from "../router";
import Querystring from "query-string";
import { HTTP } from "../common/http-common";
import { WhithoutErrorHttp } from "../common/http-whithoutErrorChecking";
import image403 from "../assets/img/403.png";
import swal from "sweetalert2";

const users = {
  namespaced: true,
  state: {
    client: {},
    image403: image403
  },
  mutations: {
    setUserData(state, res) {
      state.client.name = res.data.result.name;
      state.client.username = res.data.result.username;
      localStorage.setItem("token", res.data.result.token);
      localStorage.setItem("name", res.data.result.name);
      localStorage.setItem("username", res.data.result.username);
      router.push({ path: "dashboard" });
    },

    loginError(state, err) {
      state.loginStatus = false;
      let status = err.response.status;
      let msg = "";
      if (parseInt(status / 400) === 1) {
        msg = "مشخصات وارد شده اشتباه است.";
      } else {
        msg = "مشکلی پیش آمده‌است لطفا دوباره تلاش کنید.";
      }

      swal({
        title: "خطا",
        text: msg,
        type: "error",
        confirmButtonText: "باشه"
      });
    },

    setUserLocal(state) {
      state.client.name = localStorage.getItem("name");
      state.client.username = localStorage.getItem("username");
    },

    clearUserData(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("username");
      state.client = {};
      state.isLoggedIn = false;
      router.push({
        path: "/login"
      });
    }
  },
  actions: {
    login: function({ commit }, userInput) {
      HTTP.post("/admin/login/", userInput)
        .then(res => {
          commit("setUserData", res);
        })
        .catch(err => {
          commit("loginError", err);
        });
    },

    getUserInfo: function({ commit }) {
      commit("setUserLocal");
    },

    logout: function({ commit }) {
      WhithoutErrorHttp.get("/admin/logout/")
        .then(res => {
          commit("clearUserData");
        })
        .catch(err => {
          commit("clearUserData");
        });
    },

    accessDenied: function() {
      swal({
        title: "خطا",
        text: "شما دسترسی انجام این درخواست را ندارید.",
        imageUrl: image403,
        imageHeight: 200,
        imageAlt: "403",
        confirmButtonText: "باشه"
      });
      router.push({
        path: "/"
      });
    },

    notFound: function() {
      router.push({
        path: "/404"
      });
    },

    serverError: function() {
      swal({
        type: 'warning',
        title: "خطا",
        text: "خطای سرور. دوباره تلاش کنید.",
        confirmButtonText: "باشه"
      });
    }
  },
  getters: {}
};

export default users;
