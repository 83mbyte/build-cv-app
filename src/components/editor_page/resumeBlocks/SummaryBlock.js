
import { VStack } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { setResumeSummaryData } from '@/redux/resume/summaryBlockSlice';
import CustomHeading from '../dataFields/CustomHeading';
import CustomText from '../dataFields/CustomText';

const SummaryBlock = ({ editableFields }) => {
    const fontSize = useSelector(state => state.fontSettings.fontSize);
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const summaryHeading = useSelector(state => state.resumeSummary.summaryHeading);
    const summaryText = useSelector(state => state.resumeSummary.summaryText);
    const dispatch = useDispatch();

    const onChangeHandler = (name, value,) => {
        dispatch(setResumeSummaryData({ name, value }));
    }

    return (

        <VStack bg='' alignItems={'flex-start'} w='full' border={'1px dotted white'} _hover={{ outlineStyle: 'solid', outlineColor: `${themeColor}.100`, outlineWidth: '1px' }} padding={1} borderRadius={'lg'} >
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

        </VStack >
    );
};

export default SummaryBlock;