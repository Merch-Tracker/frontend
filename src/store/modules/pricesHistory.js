import axios from "axios";

const getHeaders = (state) => {
    return {
        Authorization: `Bearer ${state.authAndToken.token}`
    };
};

const actions = {
    async getPricesHistory({ rootState }, {merchUuid, count}){
        try {
            const response = await axios.get(`/prices/${merchUuid}`,
                {
                    headers: getHeaders(rootState),
                    params: { count: count }
                });
            if (response.status === 200) {
                return response.data;
            } else {
                return [];
            }
        }

        catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default {
    namespaced: true,
    actions,
}