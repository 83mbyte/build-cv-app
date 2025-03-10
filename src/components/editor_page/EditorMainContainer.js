
import { useRef, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

import { Toaster, toaster } from "@/components/ui/toaster";

import HeaderContainer from './editorHeader/HeaderContainer';
import WhiteSheetContainer from './whiteSheet/WhiteSheetContainer';
import ModalWindowBot from '../modalWindow/ModalWindowBot';
import FallbackSpinner from './FallbackSpinner';

import { editorMainContainerData } from '@/lib/content-lib';
import AuthModal from '../modalWindow/authModal/AuthModal';


const SummaryAI = lazy(() => import('./resumeBlocks/aiBot/SummaryAI'));
const SkillsAI = lazy(() => import('./resumeBlocks/aiBot/SkillsAI'));
const ExperienceAI = lazy(() => import('./resumeBlocks/aiBot/ExperienceAI'));



const EditorMainContainer = () => {
  const resumeAreaRef = useRef(null);
  const modalBlockName = useSelector(state => state.editorSettings.showModal.blockName);

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
        body: JSON.stringify({ fileName: resumeFileName, userId: process.env.NEXT_PUBLIC_FIREBASE_DEV_USER_ID, accessToken: process.env.NEXT_PUBLIC_FIREBASE_DEV_TOKEN }),
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/createPDFfromTemplate`, {
        method: "POST",
        body: JSON.stringify({ htmlString, userId: process.env.NEXT_PUBLIC_FIREBASE_DEV_USER_ID, accessToken: process.env.NEXT_PUBLIC_FIREBASE_DEV_TOKEN }), // use id and token of registered users
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
      console.error(editorMainContainerData.errors.defaultDownloadError ?? 'Lorem ipsum', error);
      toaster.create({
        title: editorMainContainerData.toasts.error.title,
        description: error?.message ? error.message : editorMainContainerData.errors.defaultDownloadError ?? 'Lorem ipsum',
        type: 'error',
        duration: 5000
      })
    }
  }


  return (
    <>
      <HeaderContainer clickGetPDF={downloadFilePDF} />
      <WhiteSheetContainer ref={resumeAreaRef} />

      {/* modal window of assistant */}
      <ModalWindowBot title={modalTitle} size='lg'>
        {selectedBot}
      </ModalWindowBot>

      {/* auth modal window */}
      <AuthModal />
      <Toaster />
    </>
  );
};


export default EditorMainContainer;
