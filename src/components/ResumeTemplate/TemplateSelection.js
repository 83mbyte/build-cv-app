import { Wrap, WrapItem, VStack, Box } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTemplate } from '../../redux/features/templates/templatesSlice';

const TemplateSelection = () => {
    const dispatch = useDispatch();
    const templatesVars = useSelector(state => state.templates.data.variants);
    const selected = useSelector(state => state.templates.data.selected);

    const onClickHandler = (data) => {
        dispatch(setSelectedTemplate(data));
    }
    return (
        <Wrap justify={'space-around'} my={1}>
            {
                templatesVars.map((item, index) => {
                    return (
                        <WrapItem
                            key={`template_${item.label}`}
                            p={2}
                            border={'1px solid gray'}
                            borderRadius={4}
                            transition={'all 0.8s'}
                            backgroundColor={selected === item.label ? 'teal' : 'white'}
                            color={selected === item.label && 'white'}
                            _hover={{ cursor: 'pointer', backgroundColor: 'teal', color: 'white' }}
                            onClick={() => onClickHandler(item.label)}
                        >
                            <VStack spacing={0} >
                                <Box>{item.label}</Box>
                                <Box>
                                    <img src={item.img} alt={item.label} />
                                </Box>
                            </VStack>
                        </WrapItem>
                    )
                })
            }
        </Wrap>
    );
};

export default TemplateSelection;