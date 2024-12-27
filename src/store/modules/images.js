import axios from "axios";

const getHeaders = (state) => {
    return {
        Authorization: `Bearer ${state.authAndToken.token}`
    };
};

const state = {}

const mutations = {}

const actions = {
    async uploadImage ({ rootState }, {merch_uuid, payload}) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            await axios.post(`/images/${merch_uuid}`, payload, {headers: getHeaders(rootState)});
        }

        catch (error) {
            console.log(error);
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}