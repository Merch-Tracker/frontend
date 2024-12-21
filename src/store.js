import Vuex from "vuex";
import axios from "axios";

export default new Vuex.Store({
    state: {
        isAuth: localStorage.getItem("isAuth") === "true",
        token: localStorage.getItem("token") || null,
    },

    mutations: {
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
            state.user = null;
            state.token = null;
            localStorage.removeItem("isAuth");
            localStorage.removeItem("token");
        },
    },

    actions: {
        async login({ commit }, credentials) {
            try{
                const response = await axios.post("/login", credentials);
                const {token, user} = response.data;
                commit("SET_AUTH", {isAuth: true, token});
            }
            catch(error){
                console.log("Login error", error);
            }
        },

        async logout({ commit }) {
            try{
                await axios.post("/logout");
                commit("LOGOUT");
            }
            catch(error){
                console.log("Logout error", error);
            }
        },

        async getToken({ state }) {
            return localStorage.getItem("token");
        },

        async initStore({ commit }) {
            if (localStorage.getItem("isAuth") === "true"){
                const token = localStorage.getItem("token") || null;
                commit("SET_AUTH", {isAuth: true, token});
            }
        }
    },

    getters: {
        isAuth: (state) => state.isAuth,
        token: (state) => state.token,
    },
});