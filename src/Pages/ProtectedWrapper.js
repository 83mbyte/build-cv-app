import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { addLoggedUser } from '../redux/features/utility/utilitySlice';

const ProtectedWrapper = ({ children }) => {
    const loggedUser = useSelector(state => state.utility.auth.data);
    const dispatch = useDispatch();


    if (!loggedUser) {
        const currentDate = new Date().getTime();
        const sessionString = sessionStorage.getItem('firebase:authUser:AIzaSyBiwGLTM7B9LxKqjPRjiA_CcPTyr8uiFzE:[DEFAULT]');
        if (sessionString) {
            const sessionObj = JSON.parse(sessionString);
            if (sessionObj.stsTokenManager.expirationTime > currentDate) {
                dispatch(addLoggedUser({ userId: sessionObj.uid, accessToken: sessionObj.stsTokenManager.accessToken, email: sessionObj.email }))

            } else {
                sessionStorage.removeItem('firebase:authUser:AIzaSyBiwGLTM7B9LxKqjPRjiA_CcPTyr8uiFzE:[DEFAULT]')
                return <Navigate to="/login" />
            }
        } else {
            return <Navigate to="/login" />
        }
    } else {
        return children
    }
};

export default ProtectedWrapper;