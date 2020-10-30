import Axios from "axios";
import * as URL from '../../../../constants';

async function createGroup({ name, desc, userID, groupID }, jwt){
      try{
          const response = await Axios.post(`${URL.BACKEND_URL}/groups`,{
              group_name: name,
              group_desc: desc,
              group_admin: userID,
              group_id: groupID,
          },
          {
            headers:{
                "Authorization": `Bearer ${jwt}`
            }
          });

          return response;
          
      } catch(error){
          console.log(error.response);
          throw error.response;
      } 
}

export { createGroup };