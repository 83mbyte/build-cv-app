import { useRef } from 'react';

import { VStack, Heading, HStack, Box, IconButton, Text, useToast, } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { setStatusPaidServices } from '@/redux/features/paidServices/paidServicesSlice';

import { useRouter } from 'next/navigation';

import { paymentsToastData } from '@/lib/content-lib';
import { functionsAPI } from '@/lib/functionsAPI';

import { BsCart2 } from "react-icons/bs";


const BalanceSection = () => {
    const toast = useToast({ position: 'top-right', variant: 'left-accent' });
    const timerTimeout = useRef(null);
    const router = useRouter();

    const userLogged = useSelector(state => state.auth.auth.data);
    const allowedFiles = useSelector(state => state.paidServices.data.pdf.filesAllowed);
    let currentBalance = allowedFiles * 0.5;

    const createPayment = async () => {

        const createCheckoutData = async (resolve, reject) => {
            try {
                let data = await functionsAPI.callFunction('createCheckoutSession', userLogged.accessToken);
                if (!data || data.status !== 'Success') {

                    reject({ timerTimeout: timerTimeout.current });
                } else {
                    setStatusPaidServices({ status: 'idle' });
                    resolve({
                        timerTimeout: timerTimeout.current,
                        data: data
                    })
                }

            } catch (error) {
                // console.log('error: ', error.message)
                reject({ timerTimeout: timerTimeout.current });
            }
        }

        const promiseCheckoutSession = new Promise(async (resolve, reject) => {
            timerTimeout.current = setTimeout(() => createCheckoutData(resolve, reject), 1000);
        });

        toast
            .promise(promiseCheckoutSession, {
                error: (obj) => {
                    clearTimeout(obj.timerTimeout);
                    return ({

                        title: paymentsToastData.prepareSession.error.title || `Earum exercitationem culpa!`,
                        description: paymentsToastData.prepareSession.error.descr || `Ad architecto vero debitis voluptas!`,
                        duration: 5000,
                    })
                },

                loading: {
                    title: paymentsToastData.prepareSession.loading.title || `Earum exercitationem culpa!`,
                    description: paymentsToastData.prepareSession.loading.descr || `Ad architecto vero debitis voluptas!`
                },

                success: (obj) => ({
                    title: paymentsToastData.prepareSession.success.title || `Earum exercitationem culpa!`,
                    description: paymentsToastData.prepareSession.success.descr || `Ad architecto vero debitis voluptas!`,
                    duration: 1000,
                    onCloseComplete: () => {
                        clearTimeout(obj.timerTimeout);
                        router.push(`${obj.data.content}`)
                    }
                }),
            })

    }
    return (
        <VStack spacing={1} bg=''>
            <Heading as={'h5'} size={'xs'} mb={1} w='full'>Balance</Heading>
            <HStack w='full' bg='' justifyContent={'space-between'} pl={3} alignItems={'center'} >
                <Box bg=''>
                    <VStack alignItems={'flex-start'} spacing={0}>
                        <Text fontSize={'2xl'} fontWeight={'semibold'} color={allowedFiles > 0 ? 'teal' : 'gray.400'}>${currentBalance.toFixed(2)}</Text>
                        {
                            allowedFiles > 0
                                ? <Text fontSize={'xs'} color={'gray.500'}>You can download {allowedFiles} PDF files.</Text>
                                : <Text fontSize={'xs'} color={'gray.500'}>Download of PDF files is unavailable.</Text>
                        }

                    </VStack>
                </Box>
                <Box bg=''>
                    {allowedFiles < 1 &&
                        <IconButton aria-label='Add Fundsbas' icon={<BsCart2 />} colorScheme='teal' variant={'ghost'} size={'lg'} onClick={createPayment} />}
                </Box>
            </HStack>

        </VStack>
    );
};

export default BalanceSection;