import axios from "axios";

const getHeaders = (state) => {
    return {
        Authorization: `Bearer ${state.authAndToken.token}`
    };
};

const state = {
    labels: JSON.parse(localStorage.getItem("userLabels")) || [],
};

const mutations = {
    SET_LABELS(state, labels) {
        state.labels = labels
        localStorage.setItem("userLabels", JSON.stringify(labels));
    },
}

const actions = {
    async newLabel({ rootState, commit, dispatch }, payload) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            await axios.post("/label", payload, {headers: getHeaders(rootState)});
            await dispatch("getLabels")
        }

        catch (error) {
            console.log(error);
        }
    },

    async getLabels({ rootState, commit }) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            const response = await axios.get("/label", {headers: getHeaders(rootState)});
            const userLabels = response.data;
            commit("SET_LABELS", userLabels);
        }

        catch (error) {
            console.log(error);
        }
    },

    async updateLabel({ rootState, commit, dispatch }, {label_uuid, payload}) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            const response= await axios.put(`/label/${label_uuid}`, payload, {headers: getHeaders(rootState)});
            await dispatch("getLabels")
            return response
        }

        catch (error) {
            console.log(error);
        }
    },

    async deleteLabel({ rootState, commit, dispatch }, {label_uuid}){
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            const response= await axios.delete(`/label/${label_uuid}`, {headers: getHeaders(rootState)});
            await dispatch("getLabels")
            return response
        }

        catch (error) {
            console.log(error);
        }
    },

    async attachLabel({ rootState, commit }, {merch_uuid, label_uuid}) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            const response = await axios.post(`/alabel`,
                {
                    merch_uuid: merch_uuid,
                    label_uuid: label_uuid,
                }, {headers: getHeaders(rootState)});

            commit("merch/APPEND_LABEL", {merch_uuid, label_uuid}, {root : true})
            return response
        }

        catch (error) {
            console.log(error);
        }
    },

    async detachLabel({ rootState, commit }, {merch_uuid, label_uuid}){
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            const response = await axios.post(`/dlabel`,
                {
                    merch_uuid: merch_uuid,
                    label_uuid: label_uuid,
                }, {headers: getHeaders(rootState)});
            commit("merch/REMOVE_LABEL", {merch_uuid, label_uuid}, {root : true})
            return response
        }

        catch (error) {
            console.log(error);
        }
    },
}

const getters = {
    getUserLabels: (state) => (state.labels ? state.labels : []),
    getLabelByUuid: (state) => (uuid) => {
        return state.labels ? state.labels.find(item => item.LabelUuid === uuid) : null
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}