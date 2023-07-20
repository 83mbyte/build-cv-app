import { Box, } from '@chakra-ui/react';
import React, { useEffect, useRef, forwardRef, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgressCentered from '../Progress/CircularProgressCentered';



import * as htmlToImage from 'html-to-image';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';


import PdfBtn from '../PdfBtn/PdfBtn';
import { setIsTemplateLoaded } from '../../redux/features/templates/templatesSlice';


const Vivien = lazy(() => import('./Templates/Vivien/Vivien'));
const Amsterdam = lazy(() => import('./Templates/Amsterdam/Amsterdam'));
const Mdriad = lazy(() => import('./Templates/Mdriad/Mdriad'));
const Sloo = lazy(() => import('./Templates/Sloo/Sloo'));
const Lndn = lazy(() => import('./Templates/Lndn/Lndn'));
const AbabMin = lazy(() => import('./Templates/AbabMin/AbabMin'));


const TemplateDocumentView = () => {
    const htmlRef = useRef(null);

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

    const [canvasImg, setCanvasImg] = useState(null);
    const [isReadToPdf, setIsReadyToPdf] = useState(false);


    const createPdf = () => {
        let opt = {
            margin: [5, 2, 10, 2],
            pagebreak: {
                avoid: ['#details', '#links', '#skills', '#lang', '#hobbies', '#profile', '#education', '#courses', '#employment', '#references']
            },
            filename: "resume.pdf",
            image: { type: "jpeg", quality: 0.95 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
        };
        console.log('generating document..')
        html2pdf(htmlRef.current, opt);
    }

    const setIsLoadedTemplateStatus = (status) => {
        dispatch(setIsTemplateLoaded(status))
    }
    useEffect(() => {

        const createCanvas = (htmlRef) => {
            let sourceNode = htmlRef.current;
            htmlToImage.toPng(sourceNode, { cacheBust: true })
                .then(function (dataUrl) {
                    let img = new Image();
                    img.src = dataUrl;
                    img.alt = 'resume_preview';
                    // resultNode.appendChild(img);
                    setCanvasImg(img);
                    setIsReadyToPdf(true);
                    img = null;
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                    setCanvasImg(null);
                });
        }

        setCanvasImg(null);
        setIsReadyToPdf(false);

        if (isTemplateLoaded === true) {
            createCanvas(htmlRef);
        }

        return () => {
            setIsLoadedTemplateStatus(false)
            setCanvasImg(null);
            setIsReadyToPdf(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTemplateLoaded, templateName, htmlRef])

    return (
        <Box bg={'white'} h={'100%'} p={1}  >

            <div style={{ backgroundColor: 'white', position: 'absolute', top: '110vh' }}>
                <TemplateSource data={{ personDetails, websoclinks, skills, summary, education, courses, employmentHistory, languages, hobbies, references, additionalSections, image, setIsLoadedTemplateStatus }} templateName={templateName} ref={htmlRef} />
            </div>

            {
                templateName
                    ? <Preview canvasImg={canvasImg} isReadToPdf={isReadToPdf} createPdf={createPdf} />
                    : <Box bg='' display={'flex'} h={'100%'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                        {'Please choose a template first..'}
                    </Box>
            }

        </Box>
    );
};

export default TemplateDocumentView;

const TemplateSource = forwardRef(({ data, templateName }, ref) => {

    if (templateName) {
        switch (templateName.toLowerCase()) {
            case 'amsterdam':
                return <Suspense>
                    <Amsterdam data={data} ref={ref} />
                </Suspense>
            case 'vivien':
                return <Suspense>
                    <Vivien data={data} ref={ref} />
                </Suspense>

            case 'lndn':
                return <Suspense>
                    <Lndn data={data} ref={ref} />
                </Suspense>

            case 'sloo':
                return <Suspense>
                    <Sloo data={data} ref={ref} />
                </Suspense>

            case 'mdriad':
                return <Suspense>
                    <Mdriad data={data} ref={ref} />
                </Suspense>

            case 'ababmin':
                return <Suspense>
                    <AbabMin data={data} ref={ref} />
                </Suspense>

            default:
                return <Suspense>
                    <Amsterdam data={data} ref={ref} />
                </Suspense>
        }
    } else {
        return null

    }
});


const Preview = ({ canvasImg, isReadToPdf, createPdf }) => {

    return (
        <>
            {
                canvasImg !== null
                    ?
                    <>
                        <img src={canvasImg.src} alt={canvasImg.alt} style={{ objectFit: 'contain', border: '1px solid gray' }} />
                        {
                            isReadToPdf && <PdfBtn onClickAction={createPdf} />
                        }
                    </>
                    : <CircularProgressCentered />
            }
        </>
    )
}
