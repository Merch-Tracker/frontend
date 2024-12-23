import axios from "axios";

const state = {
    isAuth: localStorage.getItem("isAuth") === "true", // Убедитесь, что это булевое значение
    token: localStorage.getItem("token") || null,
};

const mutations = {
    SET_AUTH(state, payload) {
        state.isAuth = payload.isAuth;
        state.token = payload.token;

        if (payload.isAuth) {
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("token", payload.token);
        } else {
            localStorage.removeItem("isAuth");
            localStorage.removeItem("token");
        }
    },
    LOGOUT(state) {
        state.isAuth = false;
        state.token = null;
        localStorage.removeItem("isAuth");
        localStorage.removeItem("token");
    },
};

const actions = {
    async login({ commit }, credentials) {
        try {
            const response = await axios.post("/login", credentials);
            const { token } = response.data;
            commit("SET_AUTH", { isAuth: true, token });
        } catch (error) {
            console.log("Login error", error);
        }
    },
    async logout({ commit }) {
        commit("LOGOUT");
    },
};

const getters = {
    isAuth: (state) => state.isAuth,
    token: (state) => state.token,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
