
import { LuPlus, LuMinus, } from "react-icons/lu";
import { HStack, IconButton } from '@chakra-ui/react';
import { Tooltip } from "@/components/ui/tooltip"

import { useSelector, useDispatch } from 'react-redux';

const AddOrRemoveItem = ({ currentId, actionAdd, actionRemove, sizeButtons = null }) => {
    const dispatch = useDispatch();
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    return (
        <>
            {

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
            }
        </>
    )
}

export default AddOrRemoveItem;