
import { LuPlus, LuMinus, } from "react-icons/lu";
import { HStack, IconButton } from '@chakra-ui/react';
import { Tooltip } from "@/components/ui/tooltip"
import { motion } from 'motion/react';

import { useSelector, useDispatch } from 'react-redux';


const AddOrRemoveItem = ({ currentId, blockName, actionAdd, actionRemove, marginRight = '20px', sizeButtons = null }) => {
    const dispatch = useDispatch();
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    const show = useSelector(state => state.editorSettings.showAddRemoveButtons);



    return (
        <>
            {
                (show.show && show.id == currentId) &&
                <motion.div
                    key={`motion_${currentId}_${blockName}`}
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, transition: { delay: 0.1 } }}
                    style={{ position: 'absolute', top: -10, right: marginRight, display: 'block', }}
                >
                    <HStack>

                        <Tooltip showArrow content="Remove" openDelay={300} positioning={{ placement: 'top' }} >
                            <IconButton
                                aria-label="Remove"
                                variant={'solid'}
                                bgColor={`${themeColor}.500`}
                                _hover={{ backgroundColor: `${themeColor}.300` }}
                                size={sizeButtons ? sizeButtons : '2xs'}
                                rounded={'full'}
                                onClick={() => dispatch(actionRemove(currentId))}
                            >
                                <LuMinus size={sizeButtons} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip showArrow content="Add" openDelay={300} positioning={{ placement: 'top' }} >
                            <IconButton
                                aria-label="Add"
                                variant={'solid'}
                                bgColor={`${themeColor}.500`}
                                _hover={{ backgroundColor: `${themeColor}.300` }}
                                size={sizeButtons ? sizeButtons : '2xs'}
                                rounded={'full'}
                                onClick={() => dispatch(actionAdd())}
                            >
                                <LuPlus size={sizeButtons} />
                            </IconButton>
                        </Tooltip>
                    </HStack>
                </motion.div >
            }
        </>
    )
}

export default AddOrRemoveItem;