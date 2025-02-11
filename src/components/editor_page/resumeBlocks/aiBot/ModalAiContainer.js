import {
    DialogBody,
    DialogCloseTrigger,
    DialogActionTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip } from "@/components/ui/tooltip";
import { Button, IconButton, } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { setShowModalAiBotContainer } from "@/redux/modals/resumeAiBotSlice";
import { setShowAddRemoveButtons } from "@/redux/settings/editorSettingsSlice";

import { LuSparkles } from "react-icons/lu";

const ModalAiContainer = ({ sizeButtons, buttonVariant = false, title, buttonText, children }) => {
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const showModal = useSelector(state => state.resumeAiBot.showModalAiBotContainer.show);

    const dispatch = useDispatch();
    let buttonTrigger = <IconButton
        aria-label="AI Assistant"
        variant={'solid'}
        bgColor={`${themeColor}.500`}
        _hover={{ backgroundColor: `${themeColor}.300` }}
        size={sizeButtons ? sizeButtons : '2xs'}
        rounded={'full'}
    >
        <LuSparkles size={sizeButtons} />
    </IconButton>
    if (buttonVariant && buttonVariant == 'controlButton') {
        buttonTrigger = <Button
            aria-label="AI Assistant"
            variant={'outline'}
            bgColor={`white`}
            borderWidth={'1px'}
            borderColor={`${themeColor}.100`}
            _hover={{ backgroundColor: `${themeColor}.50` }}
            size={sizeButtons ? sizeButtons : 'xs'}
            rounded={'md'}
            px={1}
        ><LuSparkles />{buttonText || `Click Me`}</Button>
    }

    return (
        <DialogRoot closeOnInteractOutside={true} lazyMount placement={'center'} motionPreset={'scale'} open={showModal}
            onOpenChange={(e) => {
                if (e.open != true) {
                    dispatch(setShowAddRemoveButtons({ id: null, show: false }))
                }
                dispatch(setShowModalAiBotContainer({ id: null, show: e.open }))
            }}>

            <Tooltip content='AI Assistant' showArrow openDelay={300} positioning={{ placement: 'top' }}  >
                <DialogTrigger asChild >
                    {buttonTrigger}
                </DialogTrigger>
            </Tooltip>
            <DialogContent>
                <DialogCloseTrigger colorPalette={themeColor} variant='plain' />
                <DialogHeader>
                    <DialogTitle textAlign={'center'} fontSize={'xl'}>{title}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    {children}
                </DialogBody>
                {/* <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button onClick={() => console.log('save')}>Use</Button>
                </DialogFooter> */}
                {/* <DialogCloseTrigger /> */}
            </DialogContent>
        </DialogRoot>
    );
};

export default ModalAiContainer;