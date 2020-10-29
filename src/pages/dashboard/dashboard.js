import React, { useContext, useEffect, useState } from 'react';
import MainBoard from '../../components/dashboard/mainboard/MainBoard';
import Sidebar from '../../components/dashboard/sidebar/Sidebar';
import { AuthContext } from '../../contexts/authenticationContext/authContext';
import { socketDisconnect } from '../../contexts/conversationContext/conversationActions';

let socket;

const Dashboard = () => {

    const { authStatus: { userDetails } } = useContext(AuthContext);

    // useEffect(()=>{
    //     return () => {
    //         socketDisconnect(userDetails);
    //     }
    // },[]);

    return (  
        <div className='row no-gutters justify-content-center'>
            <div className='col-2'>
                <Sidebar />
            </div>
            <div className='col p-3 mt-3'>
                <div className='d-flex justify-content-center'>
                    <div className='col-10'>
                        <MainBoard user={userDetails.username} />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;



