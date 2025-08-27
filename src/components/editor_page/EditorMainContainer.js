import { useRef, lazy, Suspense, useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getSubscriptionDetailsThunk, setAuthUserData } from '@/redux/auth/authSlice';
import { setIsSaving, setLastSaved, setSaveError, getResumeDataThunk } from '@/redux/persistence/persistenceSlice';

import { Toaster, toaster } from "@/components/ui/toaster";

import { useDebouncedSave } from '@/hooks/useDebouncedSave';

import { editorMainContainerData } from '@/lib/content-lib';
import { getDataFromFunctionsEndpoint } from '@/lib/commonScripts';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/__firebase/__firebaseConf';

import HeaderContainer from './editorHeader/HeaderContainer';
import ModalWindowBot from '../modalWindow/ModalWindowBot';
import FallbackSpinner from './FallbackSpinner';
import SaveStatusIndicator from './editorHeader/SaveStatusIndicator';


const WhiteSheetContainer = lazy(() => import('./whiteSheet/WhiteSheetContainer'));
const SummaryAI = lazy(() => import('./resumeBlocks/aiBot/SummaryAI'));
const SkillsAI = lazy(() => import('./resumeBlocks/aiBot/SkillsAI'));
const ExperienceAI = lazy(() => import('./resumeBlocks/aiBot/ExperienceAI'));
const AuthModal = lazy(() => import('../modalWindow/authModal/AuthModal'));

const auth = getAuth(app);

const EditorMainContainer = () => {
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
    const resumeAreaRef = useRef(null);
    const dispatch = useDispatch();

    // --- Persistence Logic ---
    const modalBlockName = useSelector((state) => state.editorSettings.showModal.blockName);
    const { hasUnsavedChanges } = useSelector((state) => state.persistence);
    const userLogged = useSelector((state) => state.auth.data);

    // 1. Select all the slices of the resume from the Redux store.
    // We use shallowEqual to prevent re-renders if the top-level objects haven't changed.
    const {
        editorSettings,
        fontSettings,
        resumeHeader,
        resumeContact,
        resumeSummary,
        resumeEducation,
        resumeExperience,
        resumeSkills,
        resumeLanguages,
    } = useSelector((state) => ({
        editorSettings: state.editorSettings,
        fontSettings: state.fontSettings,
        resumeHeader: state.resumeHeader,
        resumeContact: state.resumeContact,
        resumeSummary: state.resumeSummary,
        resumeEducation: state.resumeEducation,
        resumeExperience: state.resumeExperience,
        resumeSkills: state.resumeSkills,
        resumeLanguages: state.resumeLanguages,
    }), shallowEqual);

    // 2. Create the data object for saving, memoizing it to prevent re-creation on every render.
    // This object will only be recreated if one of its dependencies (the slices) changes.
    const resumeDataToSave = useMemo(() => ({
        editorSettings: { // Only save relevant settings
            layout: editorSettings.layout,
            themeColor: editorSettings.themeColor,
        },
        fontSettings,
        resumeHeader,
        resumeContact,
        resumeSummary,
        resumeEducation,
        resumeExperience,
        resumeSkills,
        resumeLanguages,
    }), [editorSettings, fontSettings, resumeHeader, resumeContact, resumeSummary, resumeEducation, resumeExperience, resumeSkills, resumeLanguages]);

    // --- End of Persistence Logic ---

    let selectedBot;
    let modalTitle = 'Ai-powered assistant';

    switch (modalBlockName) {
        case 'resumeSummary':
            selectedBot = (
                <Suspense fallback={<FallbackSpinner />}>
                    <SummaryAI blockName={modalBlockName} />
                </Suspense>
            );
            break;
        case 'resumeSkills':
            selectedBot = (
                <Suspense fallback={<FallbackSpinner />}>
                    <SkillsAI />
                </Suspense>
            );
            break;
        case 'resumeExperience':
            selectedBot = (
                <Suspense fallback={<FallbackSpinner />}>
                    <ExperienceAI />
                </Suspense>
            );
            break;

        default:
            break;
    }

    const downloadFilePDF = async () => {
        const htmlString = `<!DOCTYPE html><html lang="en"><body>${resumeAreaRef.current.innerHTML}</body></html>`;

        const getStreamData = async (fileUrl) => {
            let resumeFileName;
            const fileRegex = /([resume]{6}\_(\d)+\.[pdf]{3})/g;

            resumeFileName = fileUrl.match(fileRegex)[0];

            const options = {
                method: 'POST',
                body: JSON.stringify({ fileName: resumeFileName, userId: userLogged.userId, accessToken: userLogged.accessToken }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            let response = await getDataFromFunctionsEndpoint('streamPDFtoClient', options);

            if (!response || !response.ok) {
                throw new Error(editorMainContainerData.errors.downloadError ?? 'lorem ipsum');
            }
            console.log('trying to create BLOB....');
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = resumeFileName; // file to download
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            return true;
        };

        try {
            const { currentPeriodEnd, currentTime, status } = userLogged.subscription;
            let endSubscriptionTime = new Date(currentPeriodEnd).getTime();

            if (endSubscriptionTime < currentTime || status == 'canceled' || status == 'unpaid') {
                throw new Error(editorMainContainerData.errors.subscriptionEnd ?? 'Lorem ipsum');
            }

            const options = {
                method: 'POST',
                body: JSON.stringify({ htmlString, userId: userLogged.userId, accessToken: userLogged.accessToken }), // use id and token of registered users
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const res = await getDataFromFunctionsEndpoint('createPDFfromTemplate', options);

            if (!res) {
                throw new Error('No server response');
            }

            const data = await res.json();
            if (data.status == 'Success') {
                if (data.url) {
                    const isDownloadReady = await getStreamData(data.url);
                    if (isDownloadReady) {
                        toaster.create({
                            title: editorMainContainerData.toasts.success.title ?? 'Lorem ipsum',
                            description: editorMainContainerData.toasts.success.description ?? 'Lorem ipsum',
                            type: 'success',
                            duration: 3000,
                        });
                    }
                } else {
                    throw new Error(editorMainContainerData.errors.pathOnServer ?? 'Lorem ipsum');
                }
            } else {
                throw new Error(data?.message ? data.message : editorMainContainerData.errors.generatingPDF ?? 'Lorem ipsum');
            }
        } catch (error) {
            // console.error(editorMainContainerData.errors.defaultDownloadError ?? 'Lorem ipsum', error);
            toaster.create({
                title: editorMainContainerData.toasts.error.title,
                description: error?.message ? error.message : editorMainContainerData.errors.defaultDownloadError ?? 'Lorem ipsum',
                type: 'error',
                duration: 5000,
            });
        } finally {
            return true;
        }
    };

    // 3. Define the save handler function.
    const handleSave = useCallback(async () => {
        if (!hasUnsavedChanges || !userLogged) {
            return;
        }

        dispatch(setIsSaving(true));

        const options = {
            method: 'POST',
            body: JSON.stringify({
                userId: userLogged.userId,
                accessToken: userLogged.accessToken,
                resumeData: resumeDataToSave,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await getDataFromFunctionsEndpoint('saveResumeData', options);
            if (!res || !res.ok) {
                const errorData = await res?.json();
                throw new Error(errorData?.message || 'Failed to save data.');
            }
            dispatch(setLastSaved(new Date().toISOString()));
        } catch (error) {
            dispatch(setSaveError(error.message));
            // Optionally, show a toast on save error
            toaster.create({
                type: 'error',
                title: editorMainContainerData.toasts.error.title,
                description: editorMainContainerData.errors.onSaveError || 'Failed to save data.'
            })
        }
    }, [dispatch, hasUnsavedChanges, userLogged, resumeDataToSave]);

    // 4. Use the debounced save hook. It will trigger `handleSave` 2 seconds after `resumeDataToSave` changes.
    useDebouncedSave(handleSave, 4000, resumeDataToSave);

    useEffect(() => {
        // manage userLogged state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.uid && user.accessToken) {
                auth.currentUser.getIdTokenResult(user.accessToken).then((idTokenResult) => {
                    dispatch(setAuthUserData({ userId: user.uid, accessToken: user.accessToken, email: user.email, role: idTokenResult?.claims.admin ? 'admin' : 'user', fullName: user.displayName, subscription: {} }));
                    dispatch(getSubscriptionDetailsThunk({ userId: user.uid, accessToken: user.accessToken }));
                    dispatch(getResumeDataThunk({ userId: user.uid, accessToken: user.accessToken }));
                });
            } else {
                dispatch(setAuthUserData(null));
            }

            setIsLoadingUserData(false);
        });

        return () => unsubscribe();
    }, [dispatch]);

    return (
        <>
            {isLoadingUserData ? (
                <FallbackSpinner margin='xl' />
            ) : (
                <>
                    <HeaderContainer clickGetPDF={downloadFilePDF} />
                    <Suspense>
                        <SaveStatusIndicator />
                    </Suspense>
                    <Suspense fallback={<FallbackSpinner />}>
                        <WhiteSheetContainer ref={resumeAreaRef} />
                    </Suspense>
                </>
            )}

            {/* modal window of assistant */}
            <ModalWindowBot title={modalTitle} size='lg'>
                {selectedBot}
            </ModalWindowBot>

            {/* auth modal window */}
            <Suspense fallback={<FallbackSpinner />}>
                <AuthModal />
            </Suspense>
            <Toaster />
        </>
    );
};

export default EditorMainContainer;
