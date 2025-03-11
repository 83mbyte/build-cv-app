
import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/ui/popover';
import { Button, Box, Icon, VStack, StackSeparator } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';

import { useDispatch } from 'react-redux';
import { setIsHeaderMenuOpen, setShowOverlay, } from '@/redux/settings/editorSettingsSlice';
import { setAuthUserData } from '@/redux/auth/authSlice';

import { LuCircleUserRound } from "react-icons/lu";
import { authAPI } from '@/lib/authAPI';
import { useRef } from 'react';

const HeaderUserMenu = () => {
    const dispatch = useDispatch();

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
                            <Box w='full' ref={initFocusRef}>
                                <Button size={['2xs', 'xs']} w='full' variant={'ghost'} colorPalette={'teal'} _hover={{ opacity: 0.5 }} disabled>
                                    Manage Subscription
                                </Button>

                            </Box>

                        </VStack>

                        <Box w='full'>
                            <Button size={['2xs', 'xs']} w='full' variant={'solid'} colorPalette={'red'} onClick={signOutHandler}>
                                Sign Out
                            </Button>

                        </Box>

                        {/* sizing fonts */}

                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot >
    );
};

export default HeaderUserMenu;