import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { summaryData } from '@/lib/content-lib';
import { AnimatePresence } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';
import { getSummary, inputSummaryUpdate, setSummaryErrorMessage } from '@/redux/features/summary/summarySlice';
import { setIsModifiedContent } from '@/redux/features/utility/utilitySlice';

import SectionWrapper from '../SectionsWrapper';
import SectionDescription from '../SectionDescription';
import LoadingSectionSkeleton from '@/components/Loaders/LoadingSectionSkeleton';
import TextEditor from '@/components/FormItems/TextEditor/TextEditor';
import AutoCreateSummary from './AutoCreateSummary/AutoCreateSummary';
import AlertCustom from '@/components/Alert/AlertCustom';

const Summary = ({ userLogged }) => {
    let content = null;
    const dispatch = useDispatch();

    const data = useSelector(state => state.summary.data);
    const status = useSelector(state => state.summary.status);
    const error = useSelector(state => state.summary.error);
    const isSectionVisible = useSelector(state => state.summary.__serv.isSectionVisible);

    const onChangeHandler = (data, error) => {
        if (error) {
            dispatch(setSummaryErrorMessage({ message: summaryData.alerts.error || `Lorem ipsum dolor, sit amet consectetur` }))
        } else {
            dispatch(setIsModifiedContent({ status: true, section: 'summary' }));
            dispatch(inputSummaryUpdate({ value: data }));
        }

    }

    if (status === 'ready' && data && data !== undefined) {
        content = isSectionVisible &&
            <SectionWrapper sectionTitle='Professional Summary' flexDirect='column'>
                <SectionDescription value={summaryData?.sectionDescription || `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum exercitationem commodi culpa, temporibus blanditiis adipisci optio, ad architecto vero quidem animi dignissimos debitis voluptas!`} />
                <AutoCreateSummary accessToken={userLogged.accessToken} onChangeCallback={onChangeHandler} disabled={error !== ''} />
                <Box pb={1}>
                    <AnimatePresence mode='wait'>
                        {
                            (error && error !== '') &&
                            <AlertCustom type='error' message={error} />
                        }
                    </AnimatePresence>
                </Box>
                <TextEditor state={data || ''} onChangeCallback={onChangeHandler} />
            </SectionWrapper>
    }
    else if (status === 'ready' && (data === undefined || !data)) {
        content = <Box p={'10px'}>Something wrong - missed data for the Summary section.</Box>
    }
    else if (status === 'failed') {
        content = <Box p={'10px'}>Something wrong. {error}</Box>
    }
    else {
        content = <LoadingSectionSkeleton rowsNumber={0} textArea={true} />
    }

    useEffect(() => {
        if (status === 'idle' && userLogged) {
            dispatch(getSummary(userLogged));
        }
    }, [status]);

    useEffect(() => {
        let timer1 = null;

        if (error && error !== '') {
            timer1 = setTimeout(() => { dispatch(setSummaryErrorMessage()) }, 5000);
        }

        return () => {
            if (timer1) {

                clearTimeout(timer1);
            }
        };
    }, [error]);

    return (
        <>
            {content}
        </>
    );
};

export default Summary;
