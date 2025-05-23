
import { VStack, Button } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { setResumeSummaryData, setResumeSummaryIsVisible } from '@/redux/resume/summaryBlockSlice';
import { setShowBlockControl, setShowModal } from '@/redux/settings/editorSettingsSlice';

import { LuSparkles } from "react-icons/lu";

import CustomHeading from '../dataFields/CustomHeading';
import CustomText from '../dataFields/CustomText';
import BlockControlContainer from '../blockControl/BlockControlContainer';

const SummaryBlock = ({ editableFields }) => {

    const blockName = 'resumeSummary';
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const showBlockControl = useSelector(state => state.editorSettings.showBlockControl);
    const dispatch = useDispatch();

    if (editableFields) {
        return (

            <VStack bg='' alignItems={'flex-start'} w='full'
                padding={1}
                borderRadius={'lg'}
                position={'relative'}
                outlineStyle={'solid'}
                outlineColor={`${themeColor}.100`}
                outlineWidth={(showBlockControl.show && showBlockControl.blockName == 'resumeSummary') ? '1px' : '0px'}
                onMouseEnter={() => dispatch(setShowBlockControl({ blockName, show: true }))}
                onMouseLeave={() => dispatch(setShowBlockControl({ blockName: null, show: false }))}
            >
                <SummaryFields dispatch={dispatch} editableFields={editableFields} />

                {
                    (showBlockControl.show && showBlockControl.blockName == 'resumeSummary') &&

                    <BlockControlContainer blockName={'resumeSummary'} hideButtonAction={setResumeSummaryIsVisible} closeText={'Hide Summary block'}  >
                        {/* add aditional controls here.. */}

                        <Button
                            aria-label="AI Assistant"
                            variant={'outline'}
                            bgColor={`white`}
                            borderWidth={'1px'}
                            borderColor={`${themeColor}.100`}
                            _hover={{ backgroundColor: `${themeColor}.50` }}
                            size={'xs'}
                            rounded={'md'}
                            px={1}
                            onClick={() => dispatch(setShowModal({ blockName, show: true }))}
                        ><LuSparkles />{'Ai Assistant' || `Click Me`}</Button>

                    </BlockControlContainer>
                }
            </VStack >

        )
    }
    else {
        return (
            // PDF render 
            <div style={{
                display: 'flex', flexDirection: 'column',
                position: 'relative',
                borderRadius: '0.5rem',
                width: '100%',
                padding: '0.25rem',
                gap: '0.5rem',
            }}
            >
                <SummaryFields dispatch={dispatch} editableFields={editableFields} />
            </div>
        )
    }
};

export default SummaryBlock;

const SummaryFields = ({ editableFields, dispatch }) => {
    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const summaryHeading = useSelector(state => state.resumeSummary.summaryHeading);
    const summaryText = useSelector(state => state.resumeSummary.summaryText);


    const onChangeHandler = (name, value,) => {
        dispatch(setResumeSummaryData({ name, value }));
    }
    return (
        <>
            <CustomHeading
                variant={'h2'}
                size={fontSize.h2}
                fontWeight={'600'}
                defaultValue={'About Me'}
                name={'summaryHeading'}
                value={summaryHeading}
                isEditable={editableFields}
                onChangeCallback={(name, value) => onChangeHandler(name, value)}

            />

            <div style={{ paddingInline: '0.5rem', width: '100%', boxSizing: 'border-box' }}>
                <CustomText
                    variant={'p'}
                    allowEnter={true}
                    size={fontSize.p}
                    fontWeight={'400'}
                    defaultValue={'Provide your professional summary'}
                    name={'summaryText'}
                    value={summaryText}
                    isEditable={editableFields}
                    onChangeCallback={(name, value) => onChangeHandler(name, value)}
                />
            </div>
        </>
    )
}