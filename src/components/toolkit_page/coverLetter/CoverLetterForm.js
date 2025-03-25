import { Box, Button, Field, HStack, Input, VStack, createListCollection } from '@chakra-ui/react';
import { useRef } from 'react';

import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";

import { useDispatch, useSelector } from 'react-redux';
import { setCoverLetterFields, setCoverLetterText, setIsLoadingCoverLetter } from '@/redux/coverLetter/coverLetterSlice';

import { sanitizeInput } from '@/lib/commonScripts';
import { LuSparkles, } from "react-icons/lu";
import { toaster } from '@/components/ui/toaster';
import { toolkitData } from '@/lib/content-lib';

const experienceLevels = createListCollection({
    items: [
        { label: "Rookie - No experience yet", value: "Rookie" },
        { label: "Beginner - A little practice", value: "Beginner" },
        { label: "Solid - Solid experience", value: "Solid" },
        { label: "Expert - Years of expertise", value: "Expert" },
    ],
});


const languageList = createListCollection({
    items: [
        { label: "English", value: "English" },
        { label: "German", value: "German" },
        { label: "Dutch", value: "Dutch" },
        { label: "French", value: "French" },
        { label: "Italian", value: "Italian" },
        { label: "Spanish", value: "Spanish" },
        { label: "Portuguese", value: "Portuguese" },
        { label: "Russian", value: "Russian" },
    ],
})

const CoverLetterForm = ({ placeholders, isButtonDisabled }) => {
    const positionRef = useRef(null);
    const companyNameRef = useRef(null);
    const skillsRef = useRef(null);

    const dispatch = useDispatch();
    const positionValue = useSelector(state => state.coverLetter.position);
    const companyNameValue = useSelector(state => state.coverLetter.companyName);
    const skillsValue = useSelector(state => state.coverLetter.skills);
    const experienceValue = useSelector(state => state.coverLetter.experience);
    const languageValue = useSelector(state => state.coverLetter.language);
    const isLoading = useSelector(state => state.coverLetter.isLoading);

    const onChangeHandler = (field, originValue) => {
        let value = originValue.trim();
        if (value.length > 3) {
            value = sanitizeInput(value);
        };
        dispatch(setCoverLetterFields({ field, value }))
    }

    const generateCoverLetter = async (e) => {
        e.preventDefault();
        dispatch(setIsLoadingCoverLetter(true))

        try {
            if (!positionValue || positionValue == '') {
                throw new Error('Please fill the required fields');
            }
            let res = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/generateData`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        query: {
                            position: positionValue,
                            companyName: companyNameValue,
                            skills: skillsValue,
                            experience: experienceValue,
                            language: languageValue,
                        },
                        variant: 'generateCoverLetter'
                    }),
            })
            if (res) {
                let result = await res.json()

                if (result.status == 'Success') {
                    const reg = /\n/g;
                    dispatch(setCoverLetterText({ value: result.content.replace(reg, '</br>') }))

                } else {
                    throw new Error(result.message)
                }
            }

        } catch (error) {
            toaster.create({
                type: 'error',
                title: 'Error',
                description: error.message
            })
        }
        finally {
            dispatch(setIsLoadingCoverLetter(false))
        }
    }

    return (
        <form style={{ width: '100%' }} onSubmit={(e) => generateCoverLetter(e)}>
            <VStack border={'0px solid #dedede'}
                bg='white'
                w='full'
                padding={'3'}
                borderRadius={'lg'}
                gap={'2'}
                alignItems={'flex-start'}
            >
                <HStack w='full' gap={6}>
                    <Field.Root required>
                        <Field.Label>{toolkitData.tools.coverLetter.formLabels.position ?? 'Position'}<Field.RequiredIndicator /></Field.Label>

                        <Input
                            ref={positionRef}
                            size={'xs'}
                            borderWidth={'1px'}
                            borderStyle={'solid'}
                            placeholder={placeholders.position ?? 'e.g. Driver'}

                            borderRadius={'lg'}
                            _focusVisible={{ outline: 'none', border: '1px solid teal' }}
                            defaultValue={positionValue}
                            onBlur={() => { onChangeHandler('position', positionRef.current.value) }}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>{toolkitData.tools.coverLetter.formLabels.companyName ?? 'Company Name'}</Field.Label>
                        <Input
                            ref={companyNameRef}
                            size={'xs'}
                            borderWidth={'1px'}
                            borderStyle={'solid'}
                            borderRadius={'lg'}
                            placeholder={placeholders.companyName ?? 'e.g. Experimental Trans'}
                            _focusVisible={{ outline: 'none', border: '1px solid teal' }}
                            defaultValue={companyNameValue}
                            onBlur={() => { onChangeHandler('companyName', companyNameRef.current.value) }}
                        />
                    </Field.Root>
                </HStack>
                <Field.Root>
                    <Field.Label>{toolkitData.tools.coverLetter.formLabels.skills ?? 'Your Skills'}</Field.Label>
                    <Input
                        ref={skillsRef}
                        size={'xs'}
                        borderWidth={'1px'}
                        borderStyle={'solid'}
                        borderRadius={'lg'}
                        placeholder={placeholders.skills ?? 'e.g. Crisis Handling'}
                        _focusVisible={{ outline: 'none', border: '1px solid teal' }}
                        defaultValue={skillsValue}
                        onBlur={() => { onChangeHandler('skills', skillsRef.current.value) }}
                    />
                </Field.Root>
                <HStack w='full' gap={6}>
                    <Field.Root>
                        <Field.Label>{toolkitData.tools.coverLetter.formLabels.experience ?? 'Experience'}</Field.Label>
                        <SelectRoot size={['xs', 'xs']} collection={experienceLevels} positioning={{ sameWidth: true, placement: "bottom" }}
                            id='customSelect'
                            defaultValue={['Beginner']}
                            onValueChange={(e) => {
                                dispatch(setCoverLetterFields({ field: 'experience', value: e.value[0] }));
                            }}
                        >
                            <SelectTrigger >
                                <SelectValueText placeholder="Beginner" />
                            </SelectTrigger>
                            <SelectContent portalled={false} width="full"  >
                                {experienceLevels.items.map((item) => (
                                    <SelectItem item={item} key={item.value} _hover={{ opacity: 0.5 }} cursor={'pointer'}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectRoot>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>{toolkitData.tools.coverLetter.formLabels.language ?? 'Choose Language'}</Field.Label>
                        <SelectRoot size={['xs', 'xs']} collection={languageList} positioning={{ sameWidth: true, placement: "top" }}
                            id='customSelectLanguage'
                            defaultValue={['English']}
                            onValueChange={(e) => {
                                dispatch(setCoverLetterFields({ field: 'language', value: e.value[0] }));
                            }}
                        >
                            <SelectTrigger >
                                <SelectValueText placeholder="English" />
                            </SelectTrigger>
                            <SelectContent portalled={false} width="full"  >
                                {languageList.items.map((item) => (
                                    <SelectItem item={item} key={item.value} _hover={{ opacity: 0.5 }} cursor={'pointer'}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectRoot>
                    </Field.Root>
                </HStack>

                <Box my={2} w='full'>
                    <Button type='submit' colorPalette={'teal'} w='full' size={['xs', 'sm']} loading={isLoading} disabled={isButtonDisabled} ><LuSparkles />{toolkitData.tools.coverLetter.buttons.generate ?? 'Generate'}</Button>
                </Box>
            </VStack>
        </form>
    )
}

export default CoverLetterForm;