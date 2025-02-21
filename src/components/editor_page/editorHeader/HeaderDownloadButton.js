import { Button, Box, Icon } from '@chakra-ui/react';
import { LuDownload } from "react-icons/lu";
import { useSelector } from 'react-redux';

const HeaderDownloadButton = ({ clickGetPDF }) => {
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    const getPdf = () => {
        console.log('clicked getPDF..');
        clickGetPDF();

    }
    return (
        <Box>
            <Button
                variant={'solid'}
                size={['2xs', 'xs']}
                colorPalette={themeColor !== 'green' ? 'green' : 'orange'}
                onClick={() => getPdf()}
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