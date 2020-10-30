import Axios from "axios";
import * as URL from '../../../../constants';

async function joinGroup(groupID, userDetails, jwt){

    const groups = userDetails.groups;
    groups.push(groupID);
    console.log(groups);

    try{
        const response = await Axios.put(`${URL.BACKEND_URL}/users/${userDetails.id}`, {
            groups
        },{
            headers:{
                "Authorization": `Bearer ${jwt}`
            }
        });

        return response;

    } catch(error){
        console.log(error.response);
        throw error;
    }
}

export { joinGroup };