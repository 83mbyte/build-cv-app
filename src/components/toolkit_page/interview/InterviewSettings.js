'use client'
import React, { useRef } from 'react';
import { VStack, HStack, Field, Input, createListCollection, Button, Box, Heading } from '@chakra-ui/react';
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";
import { toaster } from '@/components/ui/toaster';

import { useSelector, useDispatch } from 'react-redux';
import { interviewMessagesPut, setCurrentStep, setInterviewSettings, setInterviewStatus } from '@/redux/interview/interviewSlice';

import { getDataFromFunctionsEndpoint, sanitizeInput } from '@/lib/commonScripts';
import { toolkitData } from '@/lib/content-lib';
import { cookieHandler } from '@/lib/cookies';

const difficultyLevels = createListCollection({
    items: toolkitData.tools.interview.settingsCollections.difficultyLevels ?? ['Competent level']
});
const languagesCollection = createListCollection({
    items: toolkitData.tools.interview.settingsCollections.languagesCollection ?? ['English']
});
const totalQuestionsCollection = createListCollection({
    items: toolkitData.tools.interview.settingsCollections.difficultyLevels ?? ['7']
});
const categoryCollection = createListCollection({
    items: toolkitData.tools.interview.settingsCollections.categoryCollection ?? ['', 'Agriculture, Food, and Natural Resources',]
});

const InterviewSettings = ({ stepDescription, ref }) => {
    const positionRef = useRef(null);

    const dispatch = useDispatch();
    const userLogged = useSelector(state => state.auth.data);
    const accessToken = userLogged?.accessToken ?? null;

    const position = useSelector(state => state.interview.settings.position);

    const category = useSelector(state => state.interview.settings.category);
    const language = useSelector(state => state.interview.settings.language);
    const difficulty = useSelector(state => state.interview.settings.difficulty);
    const totalQuestions = useSelector(state => state.interview.settings.totalQuestions);
    const status = useSelector(state => state.interview.status);

    const onChangeHandler = (field, originValue) => {
        let value = originValue.trim();
        if (value.length > 3) {
            value = sanitizeInput(value);
        };
        dispatch(setInterviewSettings({ field, value }))
    }


    const clickOnStartButtonHandler = async () => {

        try {
            dispatch(setInterviewStatus('loading'));

            if (!position || position == '') {
                throw new Error('Please fill the required fields.');
            }

            if (!accessToken) {
                // as free user use
                let value = await cookieHandler('interview');
                if (value > 2) {
                    throw new Error('You reached the allowed requests daily limit.');
                }
            }

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        query: {
                            position, category, language, difficulty, totalQuestions,
                            firstRequest: true
                        },
                        variant: 'interview'
                    }),
            };
            const res = await getDataFromFunctionsEndpoint('generateData', options);
            if (res) {
                let result = await res.json();

                if (result.status == 'Success') {
                    dispatch(setInterviewStatus(''));
                    dispatch(interviewMessagesPut([{ role: 'system', content: result.systemPrompt }, { role: 'assistant', content: result.content }]));
                    dispatch(setCurrentStep(1));
                } else {
                    throw new Error(result.message)
                }

            } else {
                throw new Error('No server response')
            }

        } catch (error) {
            dispatch(setInterviewStatus(''));
            toaster.create({
                type: 'error',
                title: 'Error',
                description: error.message
            })

        }

    }

    return (
        <VStack w='full' gap={3} ref={ref}>
            <Heading as={'h3'} size={['sm', 'md']} my={1}>{stepDescription}</Heading>
            <Field.Root required>
                <Field.Label>{toolkitData.tools.interview.formLabels.position ?? 'Position'}<Field.RequiredIndicator /></Field.Label>
                <Input
                    ref={positionRef}
                    size={'xs'}
                    borderWidth={'1px'}
                    borderStyle={'solid'}
                    placeholder={toolkitData.tools.interview.placeholders.position ?? 'e.g. Driver'}
                    borderRadius={'lg'}
                    _focusVisible={{ outline: 'none', border: '1px solid teal' }}
                    defaultValue={position}
                    onBlur={() => { onChangeHandler('position', positionRef.current.value) }}
                />
            </Field.Root>

            <HStack w='full' gap={6}>
                {/* language */}
                <SettingsFieldAndSelect
                    id='languageSelect'
                    label={toolkitData.tools.interview.formLabels.language ?? 'Language'}
                    fieldName='language' collection={languagesCollection} defaultValue={[language ?? 'English']}
                />

                {/* difficulty */}
                <SettingsFieldAndSelect
                    id={'difficultSelect'}
                    label={toolkitData.tools.interview.formLabels.difficulty ?? 'Difficulty'}
                    fieldName={'difficulty'} collection={difficultyLevels} defaultValue={[difficulty ?? 'Entry level']} />

            </HStack>

            <HStack w='full' gap={6}>

                {/* total questions */}
                <SettingsFieldAndSelect
                    id='questionsSelect'
                    label={toolkitData.tools.interview.formLabels.questions ?? 'Total Questions'}
                    fieldName='totalQuestions'
                    collection={totalQuestionsCollection}
                    defaultValue={[totalQuestions ?? '7']}
                />

                {/* job category */}
                <SettingsFieldAndSelect
                    id='categorySelect'
                    label={toolkitData.tools.interview.formLabels.category ?? 'Job Category'}
                    fieldName='category'
                    collection={categoryCollection}
                    defaultValue={[' ']}
                />

            </HStack>
            <Box mt={3}>
                <Button loading={status == 'loading'} colorPalette={'teal'} size={['xs', 'sm']} onClick={() => clickOnStartButtonHandler()}>Start</Button>
            </Box>
        </VStack >
    );
};

export default InterviewSettings;


const SettingsFieldAndSelect = ({ id, label, fieldName, collection, defaultValue }) => {
    const dispatch = useDispatch();

    return (
        <Field.Root>
            <Field.Label>{label}</Field.Label>
            <SelectRoot size={['xs', 'xs']} collection={collection} positioning={{ sameWidth: true, placement: "bottom" }}
                id={id}
                defaultValue={defaultValue}
                onValueChange={(e) => {
                    dispatch(setInterviewSettings({ field: fieldName, value: e.value[0] }));
                }}
            >
                <SelectTrigger >
                    <SelectValueText placeholder={defaultValue[0]} />
                </SelectTrigger>
                <SelectContent portalled={true} width="full"  >
                    {collection.items.map((item) => (
                        <SelectItem item={item} key={item} _hover={{ opacity: 0.5 }} cursor={'pointer'}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
        </Field.Root>
    )
}