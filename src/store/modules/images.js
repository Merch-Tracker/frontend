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
    },

    async fetchImage({ rootState }, merch_uuid) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            const response = await axios.get(`/images/${merch_uuid}`, {
                headers: getHeaders(rootState),
                responseType: 'blob',
            });

            if (response.status === 200) {
                return URL.createObjectURL(response.data);
            } else if (response.status === 204) {
                return null;
            }

        } catch (error) {
            console.error('Error fetching image:', error);
        }
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}