import * as URL from '../../../../constants';
import qs from 'qs';
const { default: Axios } = require("axios");

async function fetchGroups(userID, jwt){

    const query = qs.stringify({
        _where: {
            _or: [
                { group_admin: userID },
                { group_members_in: userID }
            ]
        }
    })
    try{
        const response = await Axios.get(`${URL.BACKEND_URL}/groups?${query}`, {
            headers:{
                "Authorization": `Bearer ${jwt}`
            }
        });

        console.log(response);
        return response;
    } catch(error){
        console.log(error.response);
        throw error;
    }
};

export { fetchGroups };