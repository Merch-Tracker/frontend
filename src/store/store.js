import Vuex from "vuex";
import authAndToken from "@/store/modules/authAndToken.js";
import userData from "@/store/modules/userData.js";
import merch from "@/store/modules/merch.js";
import images from "@/store/modules/images.js";


export default new Vuex.Store({
    actions: {
        async initStore({ commit }) {
            if (localStorage.getItem("isAuth")){
                const token = localStorage.getItem("token") || null;
                commit("authAndToken/SET_AUTH", {isAuth: true, token});

                const user = localStorage.getItem("user") || null;
                commit("userData/SET_USER", JSON.parse(user));

                const allMerch = localStorage.getItem("allMerch") || null;
                commit("merch/SET_MERCH", JSON.parse(allMerch));
            }
        }
    },
    modules: {
        authAndToken,
        userData,
        merch,
        images,
    },
});