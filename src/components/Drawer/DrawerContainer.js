import { Drawer, DrawerContent, DrawerOverlay, Portal, } from '@chakra-ui/react';

const DrawerContainer = ({ keyId, isOpen = false, placement = 'left', size, onCloseHandler, children }) => {

    return (

        <Portal key={keyId}>
            <Drawer
                placement={placement}
                autoFocus={false}
                preserveScrollBarGap={true}
                returnFocusOnClose={false}
                size={size == 'full' ? '100%' : undefined}
                // isFullHeight={true}
                onClose={onCloseHandler}
                isOpen={isOpen}
                onOverlayClick={() => { }}
            >
                <DrawerOverlay />
                <DrawerContent padding={0}>
                    {children}
                </DrawerContent>
            </Drawer>
        </Portal>
    );
};

export default DrawerContainer;