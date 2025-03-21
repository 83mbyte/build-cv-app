
import { useRef, lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSubscriptionDetailsThunk, setAuthUserData } from '@/redux/auth/authSlice';

import { Toaster, toaster } from "@/components/ui/toaster";



import { editorMainContainerData } from '@/lib/content-lib';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/__firebase/__firebaseConf';

import HeaderContainer from './editorHeader/HeaderContainer';
import ModalWindowBot from '../modalWindow/ModalWindowBot';
import FallbackSpinner from './FallbackSpinner';

const WhiteSheetContainer = lazy(() => import('./whiteSheet/WhiteSheetContainer'));
const SummaryAI = lazy(() => import('./resumeBlocks/aiBot/SummaryAI'));
const SkillsAI = lazy(() => import('./resumeBlocks/aiBot/SkillsAI'));
const ExperienceAI = lazy(() => import('./resumeBlocks/aiBot/ExperienceAI'));
const AuthModal = lazy(() => import('../modalWindow/authModal/AuthModal'));

const auth = getAuth(app);

const EditorMainContainer = () => {
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const resumeAreaRef = useRef(null);

  const modalBlockName = useSelector(state => state.editorSettings.showModal.blockName);

  const userLogged = useSelector(state => state.auth.data);

  const dispatch = useDispatch();

  let selectedBot;
  let modalTitle = 'Ai-powered assistant';

  switch (modalBlockName) {
    case 'resumeSummary':
      selectedBot = <Suspense fallback={<FallbackSpinner />}>
        <SummaryAI blockName={modalBlockName} />
      </Suspense>
      break;
    case 'resumeSkills':
      selectedBot = <Suspense fallback={<FallbackSpinner />}><SkillsAI /></Suspense>
      break;
    case 'resumeExperience':
      selectedBot = <Suspense fallback={<FallbackSpinner />}><ExperienceAI /></Suspense>
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

      let response = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/streamPDFtoClient`, {
        method: "POST",
        body: JSON.stringify({ fileName: resumeFileName, userId: userLogged.userId, accessToken: userLogged.accessToken }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response || !response.ok) {
        throw new Error(editorMainContainerData.errors.downloadError ?? 'lorem ipsum');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resumeFileName; // file to download 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return true
    }

    try {

      const { currentPeriodEnd, currentTime, status } = userLogged.subscription;
      let endSubscriptionTime = new Date(currentPeriodEnd).getTime();

      if ((endSubscriptionTime < currentTime || status == 'canceled' || status == 'unpaid')) {
        throw new Error(editorMainContainerData.errors.subscriptionEnd ?? 'Lorem ipsum')
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/createPDFfromTemplate`, {
        method: "POST",
        body: JSON.stringify({ htmlString, userId: userLogged.userId, accessToken: userLogged.accessToken }), // use id and token of registered users
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status == 'Success') {
        if (data.url) {
          const isDownloadReady = await getStreamData(data.url);
          if (isDownloadReady) {
            toaster.create({
              title: editorMainContainerData.toasts.success.title ?? 'Lorem ipsum',
              description: editorMainContainerData.toasts.success.description ?? 'Lorem ipsum',
              type: 'success',
              duration: 3000
            })
          }

        } else {
          throw new Error(editorMainContainerData.errors.pathOnServer ?? 'Lorem ipsum')
        }
      }
      else {
        throw new Error(data?.message ? data.message : editorMainContainerData.errors.generatingPDF ?? 'Lorem ipsum')
      }
    } catch (error) {
      // console.error(editorMainContainerData.errors.defaultDownloadError ?? 'Lorem ipsum', error);
      toaster.create({
        title: editorMainContainerData.toasts.error.title,
        description: error?.message ? error.message : editorMainContainerData.errors.defaultDownloadError ?? 'Lorem ipsum',
        type: 'error',
        duration: 5000
      })
    }
    finally {
      return true
    }
  }


  useEffect(() => {
    // manage userLogged state
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user && user.uid && user.accessToken) {

        auth.currentUser.getIdTokenResult(user.accessToken).then((idTokenResult) => {

          dispatch(setAuthUserData({ userId: user.uid, accessToken: user.accessToken, email: user.email, role: idTokenResult?.claims.admin ? 'admin' : 'user', fullName: user.displayName, subscription: {} }));
          dispatch(getSubscriptionDetailsThunk({ userId: user.uid, accessToken: user.accessToken, }))
        })


      } else {
        dispatch(setAuthUserData(null));
      }

      setIsLoadingUserData(false);
    })

    return () => unsubscribe();
  }, []);



  return (
    <>
      {
        isLoadingUserData
          ? <FallbackSpinner margin='xl' />
          : <>
            <HeaderContainer clickGetPDF={downloadFilePDF} />
            <Suspense fallback={<FallbackSpinner />} >
              <WhiteSheetContainer ref={resumeAreaRef} />
            </Suspense>
          </>
      }


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
