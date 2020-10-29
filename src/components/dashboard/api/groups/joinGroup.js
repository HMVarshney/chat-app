import Axios from "axios";
import * as URL from '../../../../constants';

async function joinGroup(groupID, userDetails){

    const groups = userDetails.groups;
    groups.push(groupID);
    console.log(groups);

    try{
        const response = await Axios.put(`${URL.BACKEND_URL}/users/${userDetails.id}`, {
            groups
        });

        return response;

    } catch(error){
        console.log(error.response);
        throw error;
    }
}

export { joinGroup };