
import { VStack } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { setResumeSummaryData, setResumeSummaryIsVisible } from '@/redux/resume/summaryBlockSlice';
import { setShowBlockControl } from '@/redux/settings/editorSettingsSlice';

import CustomHeading from '../dataFields/CustomHeading';
import CustomText from '../dataFields/CustomText';
import BlockControlContainer from '../blockControl/BlockControlContainer';

const SummaryBlock = ({ editableFields }) => {
    const blockName = 'resumeSummary';
    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const summaryHeading = useSelector(state => state.resumeSummary.summaryHeading);
    const summaryText = useSelector(state => state.resumeSummary.summaryText);

    const showBlockControl = useSelector(state => state.editorSettings.showBlockControl);


    const dispatch = useDispatch();

    const onChangeHandler = (name, value,) => {
        dispatch(setResumeSummaryData({ name, value }));
    }

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
            <CustomHeading
                variant={'h2'}
                size={fontSize.h2}
                fontWeight={'600'}
                defaultValue={'Abouts Me'}
                name={'summaryHeading'}
                value={summaryHeading}
                isEditable={editableFields}
                onChangeCallback={(name, value) => onChangeHandler(name, value)}

            />

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
            {
                (showBlockControl.show && showBlockControl.blockName == 'resumeSummary') &&
                <BlockControlContainer blockName={'resumeSummary'} hideButtonAction={setResumeSummaryIsVisible} closeText={'Hide Summary block'}  >
                    {/* add aditional controls here.. */}
                </BlockControlContainer>

            }
        </VStack >
    );
};

export default SummaryBlock;