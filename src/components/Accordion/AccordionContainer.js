import React, { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon, Box, SimpleGrid, Center, Progress
} from '@chakra-ui/react';
// import Wysiwyg from '../FormElements/WYSIWYG/Wysiwyg';
import InputCustom from '../FormElements/InputCustom';

const AccordionContainer = ({ children, state, user }) => {

    const [accordionState, setAccordionState] = useState(state);

    const ARRAYSIZE = ['xs', 'md', 'md'];
    const inputsOrder = ['title', 'degree', 'period', 'location', 'description'];

    const pathCustomize = (prefix, path) => {
        let pathArr = path.split('/');
        let res = pathArr.join(`/${prefix}/`)
        return res
    }
    return (
        <Box my='3' w={'100%'} px='8px' minW={'200px'}  >
            <Accordion allowToggle allowMultiple={false}  >
                {
                    !accordionState
                        ? <Center h={'20px'} >
                            <Box bg='blue' w={['200px', 'xs', 'md', '2xl']}><Progress isIndeterminate size='xs' /></Box>
                        </Center>
                        :
                        accordionState.map((accordItem, index) => {
                            return (
                                <AccordionItem border={'1px solid'}
                                    borderColor={'gray.200'}
                                    borderRadius={"5px"}
                                    mb={4}
                                    key={index}
                                >

                                    <h2>
                                        <AccordionButton _hover={{ color: 'teal.400' }} color={'gray.200'}>
                                            <Box flex={'1'} textAlign='left'>
                                                <Box color={'black'} _hover={{ color: 'inherit' }} fontSize={['sm', 'sm', 'md']}>{accordItem.title.value}</Box>
                                                <Box fontSize={'xs'} color={'gray.500'}>{accordItem.period.value}</Box>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>

                                    <AccordionPanel pb={4}>
                                        {/* education form */}
                                        <SimpleGrid columns={[1, 1, 2]}>
                                            {/* {console.log(state[0])} */}
                                            {
                                                inputsOrder &&
                                                inputsOrder.map((key, ind) => {
                                                    if (key !== 'description') {

                                                        let path = pathCustomize(index, accordItem[key].path);
                                                        return (
                                                            <InputCustom
                                                                key={`${index}_${ind}`}
                                                                labelText={accordItem[key].label}
                                                                defValue={accordItem[key].value}
                                                                path={path}
                                                                required={accordItem[key].required}
                                                                user={user}
                                                            />


                                                            // key = {`${ind}_${index}`
                                                            // }
                                                            // +defValue = {data[item][i].value}
                                                            // +required = {data[item][i].required}
                                                            // +labelText = {data[item][i].label}
                                                            // +user = {user}
                                                            // +path = {data[item][i].path}
                                                            // handleInputChange = {handleInputChange}
                                                            // <Box p={2} key={index}>
                                                            //     <FormControl variant={'floating'} >

                                                            //         <Input size={ARRAYSIZE} placeholder=" " />
                                                            //         <FormLabel fontSize={ARRAYSIZE}>{state[0][item].label}</FormLabel>
                                                            //     </FormControl>
                                                            // </Box>
                                                        )
                                                    }
                                                })
                                            }

                                        </SimpleGrid>
                                        {/* <Box p={1}>
                            <Wysiwyg state={state[0].description} user={user} />
                        </Box> */}
                                        {/* education form end */}


                                    </AccordionPanel>
                                </AccordionItem>
                            )
                        })

                }

            </Accordion>
        </Box >
    );
};

export default AccordionContainer;