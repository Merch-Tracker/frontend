import Vuex from "vuex";
import authAndToken from "@/store/modules/authAndToken.js";
import userData from "@/store/modules/userData.js";
import merch from "@/store/modules/merch.js";
import images from "@/store/modules/images.js";
import labels from "@/store/modules/labels.js";
import viewFilter from "@/store/modules/viewFilter.js";
import pricesHistory from "@/store/modules/pricesHistory.js";
import charts from "@/store/modules/charts.js";


export default new Vuex.Store({
    actions: {
        async initStore({ commit, dispatch }) {
            if (localStorage.getItem("isAuth")){
                const token = localStorage.getItem("token") || null;
                commit("authAndToken/SET_AUTH", {isAuth: true, token});

                const user = localStorage.getItem("user") || null;
                commit("userData/SET_USER", JSON.parse(user));

                const allMerch = localStorage.getItem("allMerch") || null;
                commit("merch/SET_MERCH", JSON.parse(allMerch));

                await dispatch("labels/getLabels");
            }
        }
    },
    modules: {
        authAndToken,
        userData,
        merch,
        images,
        labels,
        viewFilter,
        pricesHistory,
        charts,
    },
});