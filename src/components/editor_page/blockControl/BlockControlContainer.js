import { HStack, IconButton } from '@chakra-ui/react';
import { motion } from 'motion/react';
import { useSelector, useDispatch } from 'react-redux';

import { LuX, } from "react-icons/lu";
import { Tooltip } from '@/components/ui/tooltip';

const BlockControlContainer = ({ blockName = 'tmp', closeText, sizeButtons = null, hideButtonAction, children }) => {

    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const dispatch = useDispatch();

    return (
        <motion.div
            key={`motion_${blockName}`}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            style={{ position: 'absolute', top: -16, right: '10px', display: 'block' }}
        >
            <HStack>

                {children}

                <Tooltip showArrow content={closeText ? closeText : 'Hide block'} openDelay={300} positioning={{ placement: 'top' }}>
                    <IconButton
                        aria-label="Hide"
                        variant={'outline'}
                        bgColor={`white`}
                        borderWidth={'1px'}
                        borderColor={`${themeColor}.100`}
                        _hover={{ backgroundColor: `${themeColor}.50` }}
                        size={sizeButtons ? sizeButtons : 'xs'}
                        rounded={'md'}
                        px={1}
                        onClick={() => dispatch(hideButtonAction({ show: false }))}
                    >
                        <LuX size={sizeButtons} />
                    </IconButton>
                </Tooltip>
            </HStack >
        </motion.div>
    );
};

export default BlockControlContainer;