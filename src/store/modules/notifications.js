import axios from "axios";

const getHeaders = (state) => {
    return {
        Authorization: `Bearer ${state.authAndToken.token}`
    };
};

const state = {
    notifications: [],
    seenNotifications: [],
};

const mutations = {
    SET_NOTIFICATIONS(state, notifications) {
        state.notifications = notifications;
    },

    APPEND_SEEN(state, seen) {
        state.seenNotifications.push(seen);
    },

    CLEAR_SEEN(state) {
        state.seenNotifications = [];
    }

};

const actions = {
    async getNotifications({ rootState, commit }) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        const response = await axios.get("/notifications", {headers: getHeaders(rootState)});
        if (response.status === 200) {
            commit('SET_NOTIFICATIONS', response.data);
            return response.data;
        }
    },

    async markAsSeen({ commit }, note) {
        commit('APPEND_SEEN', note)
    },

    async sendSeen({ rootState, state, commit }) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            if (state.seenNotifications.length > 0) {
                await axios.post(`/notifications`, state.seenNotifications, {headers: getHeaders(rootState)});
                commit("CLEAR_SEEN");
            }
        } catch (error) {
            console.log(error);
        }
    },
}

const getters = {
    getNumber(state){
        return state.notifications.filter(item => item.seen === false).length;
    },

    notificationsList: (state) => state.notifications,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}