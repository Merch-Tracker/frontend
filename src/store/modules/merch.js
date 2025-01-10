import axios from "axios";

const getHeaders = (state) => {
    return {
        Authorization: `Bearer ${state.authAndToken.token}`
    };
};

const state = {
    merch: JSON.parse(localStorage.getItem("allMerch")) || [],
};

const mutations = {
    SET_MERCH(state, merch) {
        state.merch = merch;
        localStorage.setItem("allMerch", JSON.stringify(merch));
    },

    REMOVE_MERCH(state, merchUuid){
        state.merch = state.merch.filter(item => item.MerchUuid !== merchUuid);
        localStorage.setItem("allMerch", JSON.stringify(state.merch));
    },

    APPEND_LABEL(state, { merch_uuid, label_uuid }) {
        const entry = state.merch.find(item => item.MerchUuid === merch_uuid);
        if (!entry.labels) {
            entry.labels = [];
        }

        if (entry) {
            if (!entry.labels.includes(label_uuid)) {
                entry.labels.push(label_uuid);
            }
        }
    },

    REMOVE_LABEL(state, { merch_uuid, label_uuid }) {
        const entry = state.merch.find(item => item.MerchUuid === merch_uuid);
        if (entry) {
            entry.labels = entry.labels.filter(label => label !== label_uuid);
        }
    },
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

    async updateMerch({ rootState }, {merch_uuid, payload}) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            await axios.put(`/merch/${merch_uuid}`, payload, {headers: getHeaders(rootState)});
        }

        catch (error) {
            console.log(error);
        }
    },

    async deleteMerch({ rootState, commit }, merch_uuid){
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            await axios.delete(`/merch/${merch_uuid}`, {headers: getHeaders(rootState)});
            commit("REMOVE_MERCH", merch_uuid);
        }

        catch (error) {
            console.log(error);
        }
    },
};

const getters = {
    readAllMerch: (state) => (state.merch ? state.merch : null),
    merchCount: (state) => (state.merch ? state.merch.length : 0),
    getMerchByUuid: (state) => (uuid) => {
        return state.merch ? state.merch.find(item => item.MerchUuid === uuid) : null
    },

    getFilteredMerch: (state, getters, rootState) => {
        const merchFilters = rootState.viewFilter.merchFilters;
        if (!merchFilters) {
            return state.merch;
        }

        return state.merch.filter(item =>
            item.labels && item.labels.includes(merchFilters)
        );
    },

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
