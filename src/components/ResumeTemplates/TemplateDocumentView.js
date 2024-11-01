import { Box, Spinner, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setIsTemplateLoaded } from '@/redux/features/templates/templatesSlice';
import { getPaidServicesThunk, setFilesAllowed, setStatusPaidServices } from '@/redux/features/paidServices/paidServicesSlice';

import { toPng } from 'html-to-image';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';

import { useRouter } from 'next/navigation';

import { functionsAPI } from '@/lib/functionsAPI';
import { paymentsToastData } from '@/lib/content-lib';

import PdfBtn from '../Buttons/PdfBtn/PdfBtn';
import TemplateHiddenRendering from './TemplateHiddenRendering';

const TemplateDocumentView = () => {
    const htmlRef = useRef(null);
    const router = useRouter();
    const toast = useToast({ position: 'top-right', variant: 'left-accent' });

    const dispatch = useDispatch();
    const templateName = useSelector(state => state.templates.data.selected);
    const isTemplateLoaded = useSelector(state => state.templates.data.isTemplateLoaded);

    const personDetails = useSelector(state => state.personDetails);
    const websoclinks = useSelector(state => state.links);
    const skills = useSelector(state => state.skills);
    const summary = useSelector(state => state.summary);
    const education = useSelector(state => state.education);
    const courses = useSelector(state => state.courses);
    const employmentHistory = useSelector(state => state.history);
    const languages = useSelector(state => state.languages);
    const hobbies = useSelector(state => state.hobbies);
    const references = useSelector(state => state.references);
    const image = useSelector(state => state.image.data.value);
    const additionalSections = useSelector(state => state.utility.additionalSections.data);

    const userLogged = useSelector(state => state.auth.auth.data);
    const allowedPdf = useSelector(state => state.paidServices.data.pdf);
    const statusPaidServices = useSelector(state => state.paidServices.status);
    const errorPaidServices = useSelector(state => state.paidServices.error);


    const timerTimeout = useRef(null);

    const [canvasImg, setCanvasImg] = useState(null);
    const [isReadyToPdf, setIsReadyToPdf] = useState(false);

    const setIsLoadedTemplateStatus = (status) => {
        dispatch(setIsTemplateLoaded(status))
    }

    const createPdf = () => {

        let opt = {
            margin: [0, 0, 0, 0],
            // margin: [5, 2, 10, 2],
            pagebreak: {
                avoid: ['#details', '#links', '#skills', '#lang', '#hobbies', '#profile', '#education', '#courses', '#employment', '#references']
            },
            filename: "resume.pdf",
            image: { type: "jpeg", quality: 0.9 },
            // image: { type: "png", quality: 0.95 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
        };

        html2pdf(htmlRef.current, opt)
            .then(
                () => {
                    // 'PDF created'
                    dispatch(setFilesAllowed(-1));

                },
                () => { console.log('something wrong..') });
    }

    const createPayment = async () => {

        const createCheckoutData = async (resolve, reject) => {
            let data = await functionsAPI.callFunction('createCheckoutSession', userLogged.accessToken);
            if (!data || data.status !== 'Success') {

                reject({ timerTimeout: timerTimeout.current });
            } else {
                setStatusPaidServices({ status: 'idle' });
                resolve({
                    timerTimeout: timerTimeout.current,
                    data: data
                })
            }
        }

        const promiseCheckoutSession = new Promise(async (resolve, reject) => {
            timerTimeout.current = setTimeout(() => createCheckoutData(resolve, reject), 1000);
        });

        toast
            .promise(promiseCheckoutSession, {
                error: (obj) => {
                    clearTimeout(obj.timerTimeout);
                    return ({
                        title: paymentsToastData.prepareSession.error.title || `Earum exercitationem culpa!`,
                        description: paymentsToastData.prepareSession.error.descr || `Ad architecto vero debitis voluptas!`,
                        duration: 5000,
                    })
                },

                loading: {
                    title: paymentsToastData.prepareSession.loading.title || `Earum exercitationem culpa!`,
                    description: paymentsToastData.prepareSession.loading.descr || `Ad architecto vero debitis voluptas!`
                },

                success: (obj) => ({
                    title: paymentsToastData.prepareSession.success.title || `Earum exercitationem culpa!`,
                    description: paymentsToastData.prepareSession.success.descr || `Ad architecto vero debitis voluptas!`,
                    duration: 1000,
                    onCloseComplete: () => {
                        clearTimeout(obj.timerTimeout);
                        router.push(`${obj.data.content}`)
                    }
                }),
            })

    }

    useEffect(() => {

        const createCanvas = (htmlRef) => {
            let sourceNode = htmlRef.current;
            toPng(sourceNode, { cacheBust: true })
                .then((dataUrl) => {
                    let img = new Image();

                    img.src = dataUrl;
                    img.alt = 'resume_preview';
                    setCanvasImg(img);
                    setIsReadyToPdf(true);
                    img = null;
                })
                .catch((error) => {
                    console.error('oops, something went wrong! ', error.message);
                    setCanvasImg(null);
                });
        }

        if (htmlRef.current && isTemplateLoaded) {
            setCanvasImg(null);
            setIsReadyToPdf(false);
            createCanvas(htmlRef);
        }

        // return () => {

        //     setIsReadyToPdf(false);
        //     setCanvasImg(null);
        //     setIsLoadedTemplateStatus(false)
        // };

    }, [templateName, htmlRef, isTemplateLoaded]);


    useEffect(() => {
        if (statusPaidServices === 'idle' && userLogged) {
            dispatch(getPaidServicesThunk(userLogged));
        }
    }, [statusPaidServices, userLogged, dispatch])


    return (
        <Box bg={'white'} h={'100%'} p={1}  >

            <div style={{ backgroundColor: 'white', position: 'absolute', top: '110vh', }}>
                {
                    templateName &&
                    <TemplateHiddenRendering data={{ personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, additionalSections, image, setIsLoadedTemplateStatus }} templateName={templateName} ref={htmlRef} />
                }
            </div>

            {
                templateName

                    ? <Preview canvasImg={canvasImg} createPayment={createPayment} isReadyToPdf={isReadyToPdf} createPdf={createPdf} allowedPdf={allowedPdf} />
                    : <Box bg='' display={'flex'} h={'100%'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                        {'Please choose a template first..'}
                    </Box>
            }

        </Box>

    );
};

export default TemplateDocumentView;

const Preview = ({ canvasImg, isReadyToPdf, createPdf, allowedPdf, createPayment }) => {

    return (
        <>
            {
                canvasImg !== null
                    ?
                    <>
                        <img src={canvasImg.src} alt={canvasImg.alt} style={{ objectFit: 'contain', border: '1px solid gray' }} />

                        {
                            (isReadyToPdf) && <PdfBtn isAllowed={allowedPdf.isAllowed} onClickAction={allowedPdf.isAllowed ? createPdf : createPayment} />
                        }
                    </>
                    : <Box p={2} w='full' display={'flex'} bg={'transparent'} justifyContent={'center'} h='100%' alignItems={'center'}>
                        <Spinner color='teal' size='xl' />
                    </Box>
            }
        </>
    )
}