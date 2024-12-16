import React, { Suspense, forwardRef, useEffect, lazy } from 'react';

const Mdriad = lazy(() => import('./Templates/Mdriad/Mdriad'));
const Vivien = lazy(() => import('./Templates/Vivien/Vivien'));
const Amsterdam = lazy(() => import('./Templates/Amsterdam/Amsterdam'));
const Sloo = lazy(() => import('./Templates/Sloo/Sloo'));
const Lndn = lazy(() => import('./Templates/Lndn/Lndn'));
const AbabMin = lazy(() => import('./Templates/AbabMin/AbabMin'));

const TemplateHiddenRendering = forwardRef(function TemplateHiddenRenderingRef({ data, templateName }, ref) {
    const { setIsLoadedTemplateStatus } = data;

    useEffect(() => {
        let timer1 = null;

        if (templateName) {
            timer1 = setTimeout(() => { setIsLoadedTemplateStatus(true); }, 700);
        }

        return () => {
            if (timer1) {
                clearTimeout(timer1);
                setIsLoadedTemplateStatus(false);
            }
        };
    }, [templateName]);

    return (
        <Suspense fallback={<LoadingTemplate />}>
            <TemplateToShow data={data} templateName={templateName} ref={ref} />
        </Suspense>
    )
});

export default TemplateHiddenRendering;

const LoadingTemplate = () => {
    return (<div style={{ margin: '20px', padding: '10px' }}>Loading..</div>)
}

function EnhancedComponent(Component) {

    const Tmp = forwardRef(function TmpWithRef(props, ref) {
        return <Component data={props.data} templateName={props.templateName} ref={ref} />
    })

    return Tmp;
}

const ChooseTemplateToShow = forwardRef(function ChooseTemplateToShowWithRef({ data, templateName }, ref) {
    let selectedTemplate;
    if (templateName) {
        switch (templateName.toLowerCase()) {
            case 'vivien':
                selectedTemplate = <Vivien data={data} ref={ref} />
                break;

            case 'amsterdam':
                selectedTemplate = <Amsterdam data={data} ref={ref} />
                break;

            case 'mdriad':
                selectedTemplate = <Mdriad data={data} ref={ref} />;
                break;

            case 'lndn':
                selectedTemplate = <Lndn data={data} ref={ref} />;
                break;

            case 'sloo':
                selectedTemplate = <Sloo data={data} ref={ref} />;
                break;

            case 'ababmin':
                selectedTemplate = <AbabMin data={data} ref={ref} />;
                break;
            default:
                selectedTemplate = <Amsterdam data={data} ref={ref} />
        }
    }
    return (selectedTemplate)
});


const TemplateToShow = EnhancedComponent(ChooseTemplateToShow);