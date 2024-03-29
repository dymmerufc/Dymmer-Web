import router from "@/router";
import axios from "axios";

const state = {
  userData: {
    nome: "Usuário",
  },
  apiURL: `https://wild-ruby-bream-hat.cyclic.app`,
  error: null,
};

const mutations = {
  setUserData: (state, payload) => {
    state.userData = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
};

const actions = {
  signIn: async (context, user) => {
    await axios
      .post(`${state.apiURL}/users/authenticate`, {
        email: user.email,
        password: user.password,
      })
      .then(({ data }) => {
        localStorage.setItem("@token", data["token"]);
        localStorage.setItem("@user", JSON.stringify(data["user"]));
        router.push("/home");
      })
      .catch((err) => {
        context.commit("setError", err.response.data.error);
      });
  },

  signUp: async (context, user) => {
    await axios
      .post(`${state.apiURL}/users/register`, {
        email: user.email,
        password: user.password,
        name: user.name,
      })
      .then(({ data }) => {
        localStorage.setItem("@token", data["token"]);
        localStorage.setItem("@user", JSON.stringify(data["user"]));
        router.push("/home");
      })
      .catch((err) => {
        context.commit("setError", err.response.data.error);
      });
  },

  logout: () => {
    localStorage.clear();
    router.push("/");
  },
};

const getters = {
  getUserData: (state) => state.userData,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
