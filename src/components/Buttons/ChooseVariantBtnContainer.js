import { Box, ButtonGroup, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsModifiedTrue } from '../../redux/features/utility/utilitySlice';
import ChooseVariantButton from './ChooseVariantButton';

const ChooseVariantBtnContainer = ({ variants, section, addNewItemPredefined }) => {
    const dispatch = useDispatch();

    const onButtonClickHandler = (value) => {
        let index = variants.indexOf(value);
        dispatch(addNewItemPredefined({ value, index }));
        dispatch(setIsModifiedTrue({ status: true, section: section }));

    }
    return (

        <Box my='3' w={'100%'} px='8px' minW={'200px'}  >
            <ButtonGroup colorScheme={'teal'} variant={'ghost'} size={'sm'}>
                <Wrap spacing={3}>
                    {
                        variants.map((item, index) => {
                            return (
                                <WrapItem key={`${item.slice(0, 2)}_${index}`}>
                                    <ChooseVariantButton value={item} onButtonClickHandler={onButtonClickHandler} />
                                </WrapItem>
                            )
                        })
                    }
                </Wrap>
            </ButtonGroup>

        </Box>
    );
};

export default ChooseVariantBtnContainer;