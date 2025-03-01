import axios from "axios";

const getHeaders = (state) => {
    return {
        Authorization: `Bearer ${state.authAndToken.token}`
    };
};

const actions = {
    async getServiceStatus({ rootState }){
        if (!rootState.authAndToken.isAuth) {
            return;
        }

        try {
            const response = await axios.get(`/status/parser`, {headers: getHeaders(rootState)});
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        }

        catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default {
    namespaced: true,
    actions,
}