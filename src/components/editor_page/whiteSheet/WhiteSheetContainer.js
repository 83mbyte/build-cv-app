import { Box, Portal, } from "@chakra-ui/react";
import { Fragment } from "react";
import WhiteSheetGridLayout from "./WhiteSheetGridLayout";
import { pageSize } from "@/lib/defaults";


const a4 = pageSize.a4;
const WhiteSheetContainer = ({ ref }) => {

    return (
        <Fragment>
            <Box backgroundColor={''} w='full' paddingTop={['65px', '100px']} position={'relative'} display={'flex'} justifyContent={'center'}>
                <Box backgroundColor={'white'}
                    id='resumePaper'
                    minW={'xs'}
                    w='full'
                    maxWidth={a4.w}
                    minHeight={a4.h}
                    h='100%'
                    // overflow={'hidden'}
                    marginX={['0.5', '1', 'auto']}
                    padding={['2', '4rem']}
                    border={'0px solid red'}
                >
                    <WhiteSheetGridLayout editableFields={true} />
                </Box>
            </Box>

            {/* rendering duplicate */}
            <Portal>
                <Box backgroundColor={'white'}
                    boxSizing={'border-box'}
                    ref={ref}
                    id='resumePapperHidden'
                    zIndex={-10}
                    w={a4.w}
                    minW={'595pt'}
                    maxWidth={a4.w}
                    // minHeight={'745pt'}
                    overflow={'scroll'}   //  OR hidden? 
                    marginX={'auto'}
                    position={'fixed'}   // OR absolute?
                    top={30}
                    left={10}
                    // padding={'4rem'}
                    // padding={'0rem 4rem 0rem 4rem'}
                    border={'0px solid blue'}
                    visibility={'hidden'}
                >

                    {/* duplicate for rendering goes here  */}
                    <WhiteSheetGridLayout editableFields={false} />
                </Box>
            </Portal>
        </Fragment>
    )
};

export default WhiteSheetContainer;

