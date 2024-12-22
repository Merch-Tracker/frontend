import Vuex from "vuex";
import axios from "axios";

export default new Vuex.Store({
    state: {
        isAuth: localStorage.getItem("isAuth"),
        token: localStorage.getItem("token") || null,
        user: localStorage.getItem("user") || null,
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
            localStorage.removeItem("user");
        },

        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        }
    },

    actions: {
        async initStore({ commit }) {
            if (localStorage.getItem("isAuth")){
                const token = localStorage.getItem("token") || null;
                commit("SET_AUTH", {isAuth: true, token});

                const user = localStorage.getItem("user") || null;
                commit("SET_USER", user);
            }
        },

        async login({ commit }, credentials) {
            try{
                const response = await axios.post("/login", credentials);
                const {token} = response.data;
                commit("SET_AUTH", {isAuth: true, token});
            }
            catch(error){
                console.log("Login error", error);
            }
        },

        async logout({ commit }) {
            try{
                commit("LOGOUT");
            }
            catch(error){
                console.log("Logout error", error);
            }
        },

        async getToken({ state }) {
            return localStorage.getItem("token");
        },

        async getUserData({ state, commit }) {
            if (!state.isAuth) {
                return;
            }
            try {
                const response = await axios.get("/user", {
                    headers: {Authorization: `Bearer ${state.token}`}
                });
                const user = response.data;
                commit("SET_USER", user);
            }
            catch (error) {
                console.log(error);
            }
        },
    },

    getters: {
        isAuth: (state) => state.isAuth,
        token: (state) => state.token,
        userName: (state) => state.user.username,
        userEmail: (state) => state.user.email,
    },
});