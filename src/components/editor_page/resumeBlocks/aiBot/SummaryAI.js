import { useRef } from 'react';
import { VStack, Box, Text, Button, Input, HStack, Icon, StackSeparator } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';
import { setResumeHeaderData } from '@/redux/resume/headerBlockSlice';
import { setSummaryGeneratedItems, setResumeSummaryData, addSummarySelectedItems, removeSummarySelectedItems, setSummaryStatus, clearSummaryAssistantData } from '@/redux/resume/summaryBlockSlice';
import { setShowModal } from '@/redux/settings/editorSettingsSlice';

import { aiWindowButtons, summaryBotData } from '@/lib/content-lib';
import { sanitizeInput } from '@/lib/commonScripts';
import { cookieHandler } from '@/lib/cookies';

import { LuSparkles, LuSquare, LuSquareCheck } from "react-icons/lu";


const SummaryAI = ({ fieldName = 'summaryText', blockName }) => {
    const dispatch = useDispatch();

    const userLogged = useSelector(state => state.auth.data);
    const accessToken = userLogged?.accessToken ?? null;
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const position = useSelector(state => state.resumeHeader.position);
    const generatedItems = useSelector(state => state.resumeSummary.assistant.generatedItems);
    const selectedItems = useSelector(state => state.resumeSummary.assistant.selectedItems);
    const status = useSelector(state => state.resumeSummary.assistant.status);


    const skills = useSelector(state => state.resumeSkills.items);
    const languages = useSelector(state => state.resumeLanguages.items);
    const education = useSelector(state => state.resumeEducation.items);

    const positionField = useRef(null);

    const onChangeHandler = (value) => {
        const cleanValue = sanitizeInput(value);
        dispatch(setResumeHeaderData({ name: 'position', value: cleanValue }));
    }

    const clickToGenerate = async () => {
        // call a cloud function to work with AI
        // await for the function reply with generatedData to dispatch it 


        try {
            dispatch(setSummaryStatus('loading'));
            if (!accessToken) {
                // as free user use
                let value = await cookieHandler('summary');
                if (value > 3) {
                    throw new Error('You reached the allowed requests daily limit.');
                }
            }

            let detailsForSummary = {
                skills: null,
                education: null,
                languages: null,
            };
            let tempArray = [];

            if (skills && skills.length > 0) {

                skills.forEach(item => {
                    if (item.value != '' && item.value != 'Enter skill') {
                        tempArray.push(item.value);
                    }
                });

                detailsForSummary = {
                    ...detailsForSummary,
                    skills: tempArray.join(', ')
                };
                tempArray = [];
            }

            if (languages && languages.length > 0) {
                languages.forEach(item => {
                    if (item.value != '' && item.value != 'Enter language') {
                        tempArray.push(item.value);
                    }
                });

                detailsForSummary = {
                    ...detailsForSummary,
                    languages: tempArray.join(', ')
                };
                tempArray = [];
            }

            if (education && education.length > 0) {
                education.forEach(item => {
                    if (item.institution != '' && item.institution != 'School/College/Univercity') {
                        tempArray.push(item.institution);
                    }
                });

                detailsForSummary = {
                    ...detailsForSummary,
                    education: tempArray.join(', ')
                };
                tempArray = [];
            }


            let genertateSummaryReply = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/generateData`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            query: {
                                position: position,
                                details: detailsForSummary,
                            },
                            variant: 'generateSummary'
                        }),
                });

            const genertatedSummary = await genertateSummaryReply.json();

            if (genertatedSummary?.status == 'Success') {
                const data = genertatedSummary.content;
                dispatch(setSummaryGeneratedItems({ value: data }));
                dispatch(setSummaryStatus('fulfilled'));
            } else {
                throw new Error(summaryBotData.assistantErrors.generateSummary ?? 'lorem ipsum ');
            }


        } catch (error) {
            console.error(error?.message ? error.message : summaryBotData.assistantErrors.generateSummaryDefault ?? 'lorem ipsum ');
            dispatch(setSummaryStatus('idle'));
            toaster.create({
                title: 'Error',
                description: error?.message ? error.message : summaryBotData.assistantErrors.generateSummaryDefault ?? 'lorem ipsum',
                type: 'error',
                duration: 5000
            })
        }
    }

    const clickToSelectItem = (isSelectedIndex, item) => {

        if (isSelectedIndex == -1) {
            dispatch(addSummarySelectedItems({ value: item }));
        } else {
            dispatch(removeSummarySelectedItems({ value: item }))
        }
    }

    const clickUseItButton = (fieldName) => {
        dispatch(setResumeSummaryData({ name: fieldName, value: `${selectedItems[0]}` }));
        dispatch(setShowModal({ show: false }));
    }

    const clickNewButton = () => {
        dispatch(clearSummaryAssistantData());
    }
    const clickCancelButton = () => {
        dispatch(setShowModal({ show: false }))
    }

    return (

        <VStack position={'relative'}  >
            <Text>{summaryBotData.heading}</Text>

            <VStack>
                <Text bg='' w='full' textAlign={'left'} fontSize={'sm'}>{summaryBotData.description ?? 'lorem ipsum lorem ipsum'}</Text>
                <Box w='full'>
                    <Field label={summaryBotData.positionLabel} required>
                        <Input
                            size={'xs'}
                            borderWidth={'1px'}
                            borderColor={`${themeColor}.200`}
                            borderStyle={'solid'}
                            borderRadius={'lg'}
                            ref={positionField}
                            disabled={status == 'fulfilled'}
                            placeholder={summaryBotData.positionField ?? 'lorem ipsum'}
                            defaultValue={position ?? null}
                            _focusVisible={{ outline: 'none' }}
                            onChange={() => onChangeHandler(positionField.current.value)}
                        />
                    </Field>
                </Box>
            </VStack>
            <AnimatePresence>
                {
                    (generatedItems && generatedItems.length > 0) &&
                    <motion.div
                        key={`motion_${blockName}`}
                        style={{ width: '100%', overflow: 'hidden' }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: '130px', opacity: 1, transition: { opacity: { delay: 0.3 } } }}
                        exit={{ height: 0, opacity: 0 }}
                        viewport={{ once: true }}
                    >
                        <Box padding={2} w='full' minHeight={'50px'}
                            height={'130px'}
                            borderWidth={'1px'}
                            borderColor={`${themeColor}.200`}
                            borderStyle={'solid'}
                            borderRadius={'lg'}
                            bg=''
                            overflow={'scroll'}
                        >
                            <VStack width='full' bg='' overflow={'scroll'} gap={3} separator={<StackSeparator />}>
                                {
                                    generatedItems.map((item, index) => {
                                        let isSelectedIndex = -1;
                                        if (selectedItems) {
                                            isSelectedIndex = selectedItems.findIndex(itemToCheck => itemToCheck == item);
                                        }

                                        return (
                                            <Box width={'full'} cursor={'pointer'}
                                                fontSize={'sm'}
                                                borderWidth={'0px'}
                                                _hover={{ opacity: 0.5 }}
                                                userSelect={'none'}
                                                key={index}
                                                py={1}
                                                onClick={() => clickToSelectItem(isSelectedIndex, item)}
                                            >
                                                <HStack>
                                                    <Icon color={isSelectedIndex != -1 ? `${themeColor}` : 'lightgrey'}>
                                                        {isSelectedIndex != -1
                                                            ? <LuSquareCheck />
                                                            : <LuSquare />
                                                        }
                                                    </Icon>
                                                    {item}
                                                </HStack>
                                            </Box>
                                        )
                                    })
                                }
                            </VStack>
                        </Box>
                    </motion.div>
                }
            </AnimatePresence>
            <VStack gap={2} w='full' marginTop={2}>

                {
                    (!generatedItems)
                        ? <Button size='xs' w={'full'} colorPalette={themeColor} onClick={clickToGenerate} disabled={(!position || position.length < 3)} loading={status == 'loading'}> <LuSparkles />{aiWindowButtons.generate ?? 'lorem ipsum'}</Button>
                        : <>

                            <Button size='xs' w={'full'}
                                colorPalette={themeColor}
                                disabled={(!selectedItems || selectedItems.length < 1)}
                                onClick={() => clickUseItButton(fieldName)}
                            >{aiWindowButtons.use ?? 'lorem ipsum'}</Button>
                            <Button size='2xs' w={'full'} colorPalette={themeColor} variant={'ghost'} onClick={clickNewButton}>{aiWindowButtons.new ?? 'lorem ipsum'}</Button>
                            <Button size='2xs' w={'full'} colorPalette={themeColor} variant={'ghost'} onClick={clickCancelButton}>{aiWindowButtons.cancel ?? 'lorem ipsum'}</Button>

                        </>

                }
            </VStack>
        </VStack>

    );
};

export default SummaryAI;