import React from 'react';
import { Navigate, Outlet, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addLoggedUser } from '../../redux/features/utility/utilitySlice';

const ProtectedWrapper = () => {
    const loggedUser = useSelector(state => state.utility.auth.data);
    const dispatch = useDispatch();

    if (!loggedUser) {
        const apiKey = process.env.REACT_APP_API_KEY;
        const currentDate = new Date().getTime();
        const sessionString = sessionStorage.getItem(`firebase:authUser:${apiKey}:[DEFAULT]`);

        if (sessionString) {
            const sessionObj = JSON.parse(sessionString);
            if (sessionObj.stsTokenManager.expirationTime > currentDate) {
                dispatch(addLoggedUser({ userId: sessionObj.uid, accessToken: sessionObj.stsTokenManager.accessToken, email: sessionObj.email }))

            } else {
                sessionStorage.removeItem(`firebase:authUser:${apiKey}:[DEFAULT]`)
                return <Navigate to="/login" />
            }
        } else {
            return <Navigate to="/login" />
        }

    } else {
        return <Outlet />
    }
};

export default ProtectedWrapper;