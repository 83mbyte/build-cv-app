import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box, SimpleGrid, Flex,
} from '@chakra-ui/react';
import Wysiwyg from '../FormElements/WYSIWYG/Wysiwyg';
import InputCustom from '../FormElements/InputCustom';
import SpinnerCustom from '../Spinner/SpinnerCustom';

import { ExpandIcon, RemoveIcon } from '../Icons/Icon';
import ToolTip from '../ToolTip/ToolTip';
import { useDispatch } from 'react-redux';
import { setIsModifiedTrue } from '../../redux/features/utility/utilitySlice';
import AddOneMoreItem from '../Buttons/AddOneMoreItem';

const AccordionContainer = ({ state, sectionName, inputsOrder, addOneMoreValue, removeItemAction, addNewItemAction, valueUpdateAction }) => {

    const dispatch = useDispatch();
    const capitalizeString = (str) => {
        let arrStr = str.split(' ');
        for (let x = 0; x < arrStr.length; x++) {
            arrStr[x] = arrStr[x].charAt(0).toUpperCase() + arrStr[x].slice(1);
        }
        let result = arrStr.join(' ');
        return result;
    }

    const pathCustomize = (index, path) => {
        let pathArr = path.split('/');
        let res = pathArr.join(`/${index}/`);
        return res;
    }
    const contentModified = () => {
        dispatch(setIsModifiedTrue({ status: true, section: sectionName }));
    }
    const handleAddNewItemBtn = () => {
        dispatch(addNewItemAction());
        contentModified();
    }

    const removeItem = (e, itemToRemove) => {
        e.preventDefault();
        let indexToRemove = state.findIndex((elem) => elem === itemToRemove);
        dispatch(removeItemAction(indexToRemove));
        contentModified();
    }
    const handleInputChange = (path, value) => {
        dispatch(valueUpdateAction({ path: path.split('/').slice(1,), value: value }))
        contentModified();
    }

    return (
        <Box my='3' w={'100%'} px='8px' minW={'200px'}  >
            <Accordion allowToggle allowMultiple={false}>
                {
                    !state
                        ? <SpinnerCustom />
                        : state.map((accordItem, index) => {

                            return (
                                <AccordionItem border={'1px solid'}
                                    borderColor={'gray.200'}
                                    borderRadius={"5px"}
                                    mb={4}
                                    key={index}
                                >
                                    {
                                        ({ isExpanded }) => (
                                            <>
                                                <h2>
                                                    <AccordionButton
                                                        _hover={{ color: 'teal.500' }}
                                                        color={isExpanded ? 'teal.500' : 'gray.200'}
                                                    >
                                                        <Box textAlign={'left'} flex={1}>
                                                            <Box
                                                                color={'black'}
                                                                _hover={{ color: 'inherit' }}
                                                                fontSize={['sm', 'sm', 'md']}
                                                            >
                                                                {
                                                                    !accordItem[inputsOrder[0]].value || accordItem[inputsOrder[0]].value === '' || accordItem[inputsOrder[0]].value === undefined
                                                                        ? `(Not specified)`
                                                                        : capitalizeString(accordItem[inputsOrder[0]].value)
                                                                }
                                                            </Box>
                                                            <Box fontSize={'xs'} color={'gray.500'}>
                                                                {
                                                                    !accordItem[inputsOrder[1]].value || accordItem[inputsOrder[1]].value === '' || accordItem[inputsOrder[1]].value === undefined
                                                                        ? null
                                                                        : accordItem[inputsOrder[1]].value
                                                                }
                                                            </Box>
                                                        </Box>
                                                        <Flex columnGap={'15px'} alignItems={'center'}   >

                                                            <Box onClick={(e) => removeItem(e, state[index])}>
                                                                <ToolTip label='remove' type='warning'>
                                                                    <RemoveIcon isExpanded={isExpanded} />
                                                                </ToolTip>
                                                            </Box>
                                                            <ToolTip label={isExpanded ? 'show less' : 'show more'}>
                                                                <ExpandIcon isExpanded={isExpanded} />
                                                            </ToolTip>
                                                        </Flex>
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>

                                                    <SimpleGrid columns={[1, 1, 2]}>
                                                        {
                                                            inputsOrder &&
                                                            inputsOrder.map((key, ind) => {
                                                                if (key !== 'wysiwyg') {
                                                                    let path = pathCustomize(index, accordItem[key].path);
                                                                    return (
                                                                        <InputCustom
                                                                            key={`${index}_${ind}`}
                                                                            labelText={accordItem[key].label}
                                                                            defValue={accordItem[key].value}
                                                                            path={path}
                                                                            required={accordItem[key].required}
                                                                            handleInputChange={handleInputChange}
                                                                            disabled={accordItem[key].isDisabled}
                                                                        />
                                                                    )
                                                                }
                                                                return null
                                                            })
                                                        }
                                                    </SimpleGrid>
                                                    {
                                                        inputsOrder.includes('wysiwyg') &&
                                                        <Box  >

                                                            <Wysiwyg
                                                                state={state[index].wysiwyg}
                                                                path={pathCustomize(index, state[index].wysiwyg.path)}
                                                                handleInputChange={handleInputChange}
                                                            />
                                                        </Box>
                                                    }
                                                </AccordionPanel>
                                            </>
                                        )
                                    }
                                </AccordionItem>
                            )
                        })
                }
            </Accordion>
            <Box>
                <AddOneMoreItem itemType={addOneMoreValue} handleAddNewItemBtn={handleAddNewItemBtn} />
            </Box>

        </Box >
    );
};

export default AccordionContainer;