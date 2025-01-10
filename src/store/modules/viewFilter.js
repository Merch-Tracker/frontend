const state = {
    merchFilters: null,
}

const mutations = {
    setMerchFilters(state, labelUuid) {
        state.merchFilters = labelUuid;
    },
}
const actions = {
    updateMerchFilters({ rootState, commit }, {labelUuid}) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }
        commit('setMerchFilters', labelUuid);
    },
}
const getters = {
    getMerchFilters(state) {
        return state.merchFilters;
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
