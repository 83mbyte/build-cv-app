import { Heading, HStack } from '@chakra-ui/react';

import styles from './HeaderStyles.module.css';
import { PencilIcon } from '@/components/Icons/Icon';

const HeaderLogo = () => {
    return (
        <HStack color={'gray.600'} p={0} spacing={1} align={'flex-end'}>
            <PencilIcon />
            <Heading fontSize={'sm'} p={0} className={styles.logoText}  >
                BuildCV <span>App</span>
            </Heading>
        </HStack>
    );
};

export default HeaderLogo;