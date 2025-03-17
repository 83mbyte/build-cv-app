
import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/ui/popover';
import { Button, Box, Icon, VStack, StackSeparator, Heading, HStack, Alert } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';

import { useDispatch, useSelector } from 'react-redux';
import { setIsHeaderMenuOpen, setShowOverlay, } from '@/redux/settings/editorSettingsSlice';
import { setAuthUserData } from '@/redux/auth/authSlice';

import { LuCircleUserRound } from "react-icons/lu";
import { authAPI } from '@/lib/authAPI';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { editorHeaderData } from '@/lib/content-lib';

const HeaderUserMenu = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.data.accessToken);
    const userFullName = useSelector(state => state.auth.data.fullName);

    const status = useSelector(state => state.auth.data.subscription.status);
    const currentPeriodEnd = useSelector(state => state.auth.data.subscription.currentPeriodEnd);
    const customerId = useSelector(state => state.auth.data.subscription.customerId);


    const initFocusRef = useRef(null);

    const signOutHandler = async () => {
        const response = await authAPI.signOut();
        try {
            if (response?.status == 'Success') {
                toaster.create({
                    type: 'success',
                    description: 'Logout success',
                    duration: 3000
                })
                dispatch(setShowOverlay(false));
                dispatch(setIsHeaderMenuOpen({ menu: 'userMenu', value: false }))
                dispatch(setAuthUserData(null));

            } else {
                throw new Error(response.error ? response.error : 'Error. Please try again..')
            }
        } catch (error) {
            toaster.create({
                type: 'error',
                title: 'Error',
                description: error.message,
                duration: 3000
            })
        }
    }

    const handleManageSubscription = async () => {

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/manageSubscriptionPortal`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customerId: customerId, accessToken }), // user customerId from DB
            });

            const data = await response.json();
            if (data.success) {
                const { url } = data;
                setIsLoading(false);
                router.push(url); // redirect to manage subscription portal
            } else {
                throw new Error(data.error)
            }
        } catch (error) {
            toaster.create({
                type: 'error',
                title: 'Error',
                description: error.message || 'Please try again later..'
            });
            setIsLoading(false);
        }
    };

    const paidUntil = new Date(currentPeriodEnd).toLocaleDateString();

    return (
        <PopoverRoot initialFocusEl={() => initFocusRef.current} onOpenChange={(e) => {
            dispatch(setShowOverlay(e.open));
            dispatch(setIsHeaderMenuOpen({ menu: 'userMenu', value: e.open }))
        }}>
            <PopoverTrigger asChild>
                <Icon size="md" _hover={{ opacity: 0.5, cursor: 'pointer' }}>
                    <LuCircleUserRound />
                </Icon>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody >
                    <VStack gap={2} separator={<StackSeparator />}>
                        <VStack w='full' mb={5}>
                            <Box display={'flex'} color={'gray.500'} flexDirection={'row'} p={1} borderRadius={'lg'} w='full' alignItems={'center'} gap={2} justifyContent={'center'} borderBottom={'1px solid #e4e4e7'} bg={'gray.50'} borderTop={'1px solid #e4e4e7'} wordBreak={'break-all'}>
                                < Icon color={'gray.300'} size="lg" _hover={{ opacity: 0.5, cursor: 'pointer' }}>
                                    <LuCircleUserRound />
                                </Icon>
                                {userFullName && <Heading as='h2' size='lg'>{userFullName}</Heading>}
                            </Box>
                            {
                                status &&
                                <Box w='full' ref={initFocusRef} display={'flex'} color={'gray.500'} flexDirection={'column'} p={1} borderRadius={'lg'} alignItems={'center'} gap={2} justifyContent={'center'} borderBottom={'1px solid #e4e4e7'} borderTop={'1px solid #e4e4e7'} bg='gray.50'>
                                    <Heading as='h4' size='sm'>{editorHeaderData.userMenu.currentSubscription ?? 'Current Subscription'}</Heading>
                                    {
                                        status == 'pending_cancellation' &&
                                        <Box>
                                            <Alert.Root status="info" title="you can still use the service" size="sm" alignItems={'center'}>
                                                <Alert.Indicator />
                                                <Alert.Description>
                                                    <Box>
                                                        {editorHeaderData.userMenu.alertInfo[0] ?? 'lorem upsum'}
                                                    </Box><Box>{paidUntil} {editorHeaderData.userMenu.alertInfo[1] ?? 'lorem upsum'}</Box>
                                                </Alert.Description>
                                            </Alert.Root>
                                        </Box>
                                    }
                                    <HStack bg='' w='full' px={1}>
                                        <Box fontWeight={'bold'}>{editorHeaderData.userMenu.status ?? 'Status:'}</Box>
                                        < Box color={status == 'active' ? 'teal' : 'red'}>{status}</Box>
                                    </HStack>
                                    {
                                        status == 'active' &&
                                        <HStack w='full' px={1}>
                                            <Box fontWeight={'bold'}>{editorHeaderData.userMenu.paidUntil ?? 'Paid until:'}</Box>
                                            <Box >{paidUntil}</Box>
                                        </HStack>
                                    }

                                    <Button size={['2xs', 'xs']} w='full' variant={'solid'} colorPalette={'teal'} _hover={{ opacity: 0.5 }} onClick={handleManageSubscription} loading={isLoading} disabled={!customerId}>
                                        {editorHeaderData.userMenu.manageSubscription ?? 'Manage Subscription'}
                                    </Button>

                                </Box>
                            }

                        </VStack>

                        <Box w='full'>
                            <Button size={['2xs', 'xs']} w='full' variant={'solid'} colorPalette={'red'} onClick={signOutHandler}>
                                {editorHeaderData.userMenu.signOut ?? 'Sign Out'}
                            </Button>

                        </Box>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot >
    );
};

export default HeaderUserMenu;