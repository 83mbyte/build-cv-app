'use client'

import { AnimatePresence } from "framer-motion";

import { useSearchParams } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { clearAuthError } from "@/redux/features/auth/authSlice";

import AuthLoginForm from "./AuthLoginForm";
import AuthSignupForm from "./AuthSignupForm";

const AuthPageContainer = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.auth.error);
    const successMsg = useSelector(state => state.auth.auth.successMsg);

    const [isVisible, setIsVisible] = useState({ status: false, form: null });

    const paramsOriginal = useSearchParams();
    const params = useMemo(() => {
        return new URLSearchParams(paramsOriginal.toString())
    }, []);

    const runExitAnimation = () => {
        return new Promise((resolve, reject) => {

            setIsVisible({ status: false, form: null });
            setTimeout(() => resolve('Success'), 550);
        })
    };

    const changeForm = async (form) => {

        if (params.has('page')) {
            params.delete('page');
            history.replaceState(null, "", "auth");

        }
        runExitAnimation().then(resp => {
            if (error !== '' || successMsg !== '') {
                dispatch(clearAuthError())
            }
            if (resp == 'Success') {
                setIsVisible({ status: true, form: form })
            }
        })
    };

    useEffect(() => {

        if (!isVisible.status) {

            if (params.has('page')) {

                let current = params.get('page');
                if (current === 'login' || current === 'signup') {
                    setIsVisible({ status: true, form: current });
                }

            } else {
                setIsVisible({ status: true, form: 'login' })
            }
        }

        return () => {

            if (isVisible.status === true) {
                setIsVisible({ status: false, form: null })
            }
        }
    }, []);


    return (

        <>
            <AnimatePresence mode='wait'>
                {
                    (isVisible.status && isVisible.form === 'login') &&
                    <AuthLoginForm isVisible={isVisible.status} changeForm={changeForm} />
                }
                {
                    (isVisible.status && isVisible.form === 'signup') &&
                    <AuthSignupForm isVisible={isVisible.status} changeForm={changeForm} />
                }
            </AnimatePresence>
        </>
    );
};

export default AuthPageContainer;