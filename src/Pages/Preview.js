import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { previewDrawerIsOpenToggle, setPreviewDrawerStatus } from '../redux/features/utility/utilitySlice';
import { useNavigate } from 'react-router';

const PreviewDrawer = lazy(() => import('../components/Drawer/PreviewDrawer/PreviewDrawer'));

const Preview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isPreviewDrawerOpen = useSelector(state => state.utility.previewDrawer.isOpen);
    const status = useSelector(state => state.utility.previewDrawer.status);

    const onCloseHandler = () => {
        dispatch(previewDrawerIsOpenToggle());
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(previewDrawerIsOpenToggle());
            dispatch(setPreviewDrawerStatus('ready'));
        }

        if (status === 'ready' && isPreviewDrawerOpen === false) {

            const timer = setTimeout(() => {
                navigate('/dashboard');
            }, 100);

            return () => {
                dispatch(setPreviewDrawerStatus('idle'));
                clearTimeout(timer);
            }
        }
    }, [status, isPreviewDrawerOpen, dispatch, navigate])

    return (
        <Suspense >
            <PreviewDrawer isOpenProp={isPreviewDrawerOpen} onCloseHandler={onCloseHandler} />
        </Suspense>
    );
};

export default Preview;