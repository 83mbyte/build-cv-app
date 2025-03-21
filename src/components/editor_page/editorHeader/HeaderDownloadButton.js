import { setShowAuthModal } from '@/redux/auth/authSlice';
import { Button, Box, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { LuDownload } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';

const HeaderDownloadButton = ({ clickGetPDF, userLogged = null }) => {
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const [isLoading, setIsLoading] = useState(false);


    const dispatch = useDispatch();


    const getPdf = async () => {

        if (userLogged) {
            setIsLoading(true);
            let res = await clickGetPDF();
            setIsLoading(false);
        } else {
            dispatch(setShowAuthModal({ show: true, type: 'features' }))
        }

    }
    return (
        <Box>
            <Button
                variant={'solid'}
                size={['2xs', 'xs']}
                colorPalette={themeColor !== 'green' ? 'green' : 'orange'}
                onClick={() => getPdf()}
                loading={isLoading}
                loadingText={'Processing..'}
            >
                <Icon>
                    <LuDownload />
                </Icon>
                Get PDF
            </Button>
        </Box>
    );
};

export default HeaderDownloadButton;