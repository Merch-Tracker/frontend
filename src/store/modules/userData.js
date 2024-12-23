import axios from "axios";

const state = {
    user: JSON.parse(localStorage.getItem("user")) || null,
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
    }
};

const actions = {
    async getUserData({ rootState, commit }) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }
        try {
            const response = await axios.get("/user", {
                headers: { Authorization: `Bearer ${rootState.authAndToken.token}` }
            });
            const user = response.data;
            commit("SET_USER", user);
        } catch (error) {
            console.log(error);
        }
    },
};

const getters = {
    userName: (state) => (state.user ? state.user.username : null),
    userEmail: (state) => (state.user ? state.user.email : null),
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
