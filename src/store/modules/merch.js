import axios from "axios";
import authAndToken from "@/store/modules/authAndToken.js";

const getHeaders = (state) => {
    return {
        Authorization: `Bearer ${state.authAndToken.token}`
    };
};

const state = {
    merch: JSON.parse(localStorage.getItem("allMerch"))

};

const mutations = {
    SET_MERCH(state, merch) {
        state.merch = merch;
        localStorage.setItem("allMerch", JSON.stringify(merch));
    }
};

const actions = {
    async newMerch({ rootState }, payload) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            await axios.post("/merch", payload, {headers: getHeaders(rootState)});
        }

        catch (error) {
            console.log(error);
        }
    },

    async readOneMerch(){},

    async readAllMerch({ rootState, commit }) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            const response = await axios.get("/merch/all", {headers: getHeaders(rootState)});
            const allMerch = response.data;
            commit("SET_MERCH", allMerch);
        }

        catch (error) {
            console.log(error);
        }
    },

    async updateMerch(){},

    async deleteMerch(){},
};

const getters = {
    readAllMerch: (state) => (state.merch ? state.merch : null),
    merchCount: (state) => (state.merch ? state.merch.length : 0),
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

// "POST /merch"
// "GET /merch/"
// "GET /merch/all"
// "PUT /merch"
// "DELETE /merch"