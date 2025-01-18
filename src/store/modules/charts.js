const state = {
    chartDays: 7, // default
}

const mutations = {
    SET_CHART_DAYS(state, days) {
        state.chartDays = days
    },
}

const actions = {
    changeChartDays({ rootState, commit }, days) {
        if (!rootState.authAndToken.isAuth) {
            return;
        }
        commit('SET_CHART_DAYS', days)
    }
}

const getters = {
    getChartDays(state) {
        return state.chartDays
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}