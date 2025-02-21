
import { useRef, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

import { Toaster, toaster } from "@/components/ui/toaster";

import HeaderContainer from './editorHeader/HeaderContainer';
import WhiteSheetContainer from './whiteSheet/WhiteSheetContainer';
import ModalWindowBot from '../modalWindow/ModalWindowBot';
import FallbackSpinner from './FallbackSpinner';



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
        // TODO create correct templateHTML
        // TODO create correct templateHTML 

        const htmlString = `<!DOCTYPE html><html lang="en">${templatepHTML}</body></html>`;

        const getStreamData = async (fileUrl) => {

            let resumeFileName;
            const fileRegex = /([resume]{6}\_(\d)+\.[pdf]{3})/g;

            // const fileUrlDEV = `https://firebasestorage.googleapis.com/v0/b/buildcv-app-cd890.firebasestorage.app/o/users%2FsomeId%2Fresume%2Fresume_1740157238654.pdf?alt=media&token=25f04aac-9f08-48f1-ae64-85ff5d0e8584`;
            // resumeFileName = fileUrlDEV.match(fileRegex)[0]; //DEV

            resumeFileName = fileUrl.match(fileRegex)[0];

            let response = await fetch('http://127.0.0.1:5001/buildcv-app-cd890/us-central1/streamPDFtoClient', {
                method: "POST",
                body: JSON.stringify({ fileName: resumeFileName, userId: 'someId', accessToken: 'someToken' }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response || !response.ok) {
                throw new Error('PDF file download error.');
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
            const response = await fetch('http://127.0.0.1:5001/buildcv-app-cd890/us-central1/createPDFfromTemplate', {
                method: "POST",
                body: JSON.stringify({ htmlString, userId: 'someId', accessToken: 'someToken' }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            // DEV
            // console.log('start from here DEV')
            // const data = { status: 'Success', url: `someUrl` }; // DEV

            if (data.status == 'Success') {
                if (data.url) {
                    const isDownloadReady = await getStreamData(data.url);
                    if (isDownloadReady) {
                        toaster.create({
                            title: 'Success',
                            description: 'Download complete.',
                            type: 'success',
                            duration: 7000
                        })
                    }

                } else {
                    throw new Error('Unable to retrieve PDF file path on server')
                }
            }
            else {
                throw new Error(data?.message ? data.message : 'an unidentified error while creating a pdf file')
            }
        } catch (error) {
            console.error("Error in 'downloadFilePDF' function:", error);
            toaster.create({
                title: 'Error',
                description: error?.message ? error.message : `Error in 'downloadFilePDF' function`,
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
            <Toaster />
        </>
    );
};



export default EditorMainContainer;



const templatepHTML = `
<body style="margin: 0; padding: 0">
    <div
      id="sheeet"
      style="
        margin: 10px auto;
        width: 595pt;
        max-width: 595pt;
        min-height: 842pt;
        height: 842pt;
        background-color: white;
        border: 1px solid gray;
      "
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          min-height: 100%;
        "
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <h1>TEST PDF (( 21/02/2024))</h1>
        </div>

        <div style="display: flex; flex-direction: column; margin: 0 10px">
          <p style="text-align: center; margin: 10px 20px">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum rem
            possimus accusantium explicabo perferendis! Totam laudantium ipsam,
            sapiente quis asperiores nesciunt, possimus dicta tempora
            aspernatur, praesentium alias hic eos voluptates.
          </p>
          <p style="margin: 10px">
            sit, amet consectetur adipisicing elit. Rerum rem possimus
            accusantium explicabo perferendis! Totam laudantium ipsam, sapiente
            quis asperiores nesciunt, possi Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Rerum rem possimus accusantium
            explicabo perferendis! Totam laudantium ipsam, sapiente quis
            asperiores nesciunt, possimus dicta tempora aspernatur, praesentium
            alias hic eos voluptates.
          </p>
          <div style="display: flex; flex-direction: row">
            <p style="width: 100%; padding: 0 25px">
              Reprehenderit deserunt quis esse nulla aute. Officia occaecat
              commodo non consequat in deserunt qui sint. Reprehenderit commodo
              officia adipisicing veniam ad duis.
            </p>
            <p style="width: 100%; padding: 0 25px">
              Nulla nisi do amet ut occaecat esse aliquip qui anim velit dolor
              aliquip deserunt sint. Irure esse aliqua ad adipisicing in labore
              et velit. Eiusmod labore ut qui do enim esse laboris. Id laborum
              do nulla ea irure commodo cupidatat excepteur culpa cupidatat
              officia officia commodo. Nostrud et aliquip quis pariatur. Elit id
              dolore dolore tempor ea sit labore aliqua. Mollit nostrud anim
              reprehenderit mollit nulla exercitation.
            </p>
          </div>
        </div>

        <div
          style="
            display: flex;
            flex-direction: row;
            background-color: antiquewhite;
            justify-content: center;
          "
        >
          <p>Footer</p>
        </div>
      </div>
    </div>
  </body>`