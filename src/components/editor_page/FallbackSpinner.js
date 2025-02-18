import { Box, Spinner } from '@chakra-ui/react';

import { useSelector } from 'react-redux';

const FallbackSpinner = ({ size = 'lg', margin = 'md', }) => {
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    let marginSize = {
        xs: '1',
        sm: '2',
        md: '6',
        lg: '10',
        xl: '12'
    }
    return (
        <Box w='full' my={marginSize[margin]} p={1} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems='center' colorPalette={themeColor}>
            <Spinner color='colorPalette.300' size={size} />
        </Box>
    )
}
export default FallbackSpinner;