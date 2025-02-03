
import SectionContainer from '../SectionContainer';
import HeaderNavygation from './HeaderNavygation';
import HeaderText from './HeaderText';
import HeaderButtonToEditor from './HeaderButtonToEditor';
import { Image } from '@chakra-ui/react';

const Header = () => {
    return (
        <SectionContainer sectionId={'sectionHeader'} useGradient={false} bgColor="white">
            <HeaderNavygation />
            <HeaderText />
            <HeaderButtonToEditor />
            <Image
                h={['125px', '250px']}
                mb={['-5', '-10']}
                fit={'contain'}
                src={`./${process.env.NEXT_PUBLIC_APP_INDEX_TOP_IMG}`}
                alt='header section img'
            />
        </SectionContainer>

    );
};

export default Header;