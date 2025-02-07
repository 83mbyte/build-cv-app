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
import { IconButton, } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";


import { LuSparkles } from "react-icons/lu";
import { setShowModalAiBotContainer } from "@/redux/modals/resumeAiBotSlice";
import { setShowAddRemoveButtons } from "@/redux/settings/editorSettingsSlice";

const ModalAiContainer = ({ sizeButtons, hideButtons, title, id, children }) => {
    const themeColor = useSelector(state => state.editorSettings.themeColor);
    const showModal = useSelector(state => state.resumeAiBot.showModalAiBotContainer.show);

    const dispatch = useDispatch();

    return (
        <DialogRoot closeOnInteractOutside={false} lazyMount placement={'center'} motionPreset={'scale'} open={showModal}
            onOpenChange={(e) => {
                if (e.open != true) {
                    dispatch(setShowAddRemoveButtons({ id: null, show: false }))
                }
                dispatch(setShowModalAiBotContainer({ id: null, show: e.open }))
            }}>

            <DialogTrigger asChild >
                <IconButton
                    aria-label="AI Assistant"
                    variant={'solid'}
                    bgColor={`${themeColor}.500`}
                    _hover={{ backgroundColor: `${themeColor}.300` }}
                    size={sizeButtons ? sizeButtons : '2xs'}
                    rounded={'full'}
                // onClick={() => onOpenClickAction()}
                >
                    <LuSparkles size={sizeButtons} />
                </IconButton>
            </DialogTrigger>
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