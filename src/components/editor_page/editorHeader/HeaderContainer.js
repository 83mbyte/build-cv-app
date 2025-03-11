import { Suspense, lazy } from 'react';
import { Box, Stack, Text, } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import HeaderFontsMenu from './HeaderFontsMenu';
import HeaderThemeMenu from './HeaderThemeMenu';
import HeaderLayoutMenu from './HeaderLayoutMenu';
import HeaderDownloadButton from './HeaderDownloadButton';

import FallbackSpinner from '../FallbackSpinner';
const HeaderUserMenu = lazy(() => import('./HeaderUserMenu'));

const HeaderContainer = ({ clickGetPDF }) => {

    const userLogged = useSelector(state => state.auth.data);


    return (
        <Box backgroundColor={'transparent'} w='full' paddingX={[0, '2', '5']} paddingY={[0, 2]} as='header' position={'fixed'} zIndex={111} transition={'all 0.5s ease'}>
            <Box backgroundColor={'rgba(0, 0, 0, 0.64)'} w={'full'} display={'flex'} flexDirection={'row'} marginX={'auto'} color={'white'} paddingX={[2, 4]} paddingY={[1, 2, 3]} borderRadius={['none', 'md']}>

                <Stack justifyContent={'space-between'} w='full'
                    flexDir={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}

                    alignItems={'center'}>
                    <Box>
                        <Text fontSize={['sm', 'lg']}>{process.env.NEXT_PUBLIC_APP_NAME_FULL}</Text>
                    </Box>
                    <Box display={'flex'} backgroundColor={''} flex={1} justifyContent={'flex-end'} flexDirection={'row'} columnGap={[0, '4', 5]} alignItems={'center'}>
                        {/* fonts menu */}
                        <HeaderFontsMenu />

                        {/* color menu */}
                        <HeaderThemeMenu />

                        {/* Layout menu */}
                        <HeaderLayoutMenu />

                        {/* Download button */}
                        <HeaderDownloadButton clickGetPDF={clickGetPDF} userLogged={userLogged} />

                        {/* user profile button */}
                        {
                            userLogged &&
                            <Box><Suspense fallback={<FallbackSpinner size='sm' margin='xs' />}>
                                <HeaderUserMenu />
                            </Suspense>
                            </Box>
                        }

                    </Box>
                </Stack>
            </Box >
        </Box >
    );
};

export default HeaderContainer;