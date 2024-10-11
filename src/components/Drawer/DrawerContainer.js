import { Drawer, DrawerContent, DrawerOverlay, Portal } from '@chakra-ui/react';
import React, { Fragment } from 'react';

const DrawerContainer = ({ keyId, isOpen = false, placement = 'left', size, onCloseHandler, children }) => {
    return (
        <Fragment key={keyId}>
            <Portal>
                <Drawer
                    placement={placement}
                    autoFocus={false}
                    preserveScrollBarGap={true}
                    returnFocusOnClose={false}
                    size={size}
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
        </Fragment>
    );
};

export default DrawerContainer;