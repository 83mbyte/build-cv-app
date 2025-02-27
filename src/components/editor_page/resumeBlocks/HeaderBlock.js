
import { Box, VStack, Image, HStack, Button } from '@chakra-ui/react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { toaster } from '@/components/ui/toaster';
import { Tooltip } from '@/components/ui/tooltip';

import { setResumeHeaderData } from '@/redux/resume/headerBlockSlice';
import { useDispatch, useSelector } from 'react-redux';

import CustomHeading from '../dataFields/CustomHeading';

import { LuSquareUserRound } from "react-icons/lu";

const HeaderBlock = ({ editableFields }) => {


    const fullName = useSelector(state => state.resumeHeader.fullName);
    const position = useSelector(state => state.resumeHeader.position);
    const profileImage = useSelector(state => state.resumeHeader.profileImage);

    const fontSize = useSelector(state => state.fontSettings.fontSize);

    const dispatch = useDispatch();

    const onChangeHandler = (name, value,) => {
        dispatch(setResumeHeaderData({ name, value }));
    }

    let contentToShow;
    if (editableFields) {
        contentToShow =
            // render to user
            <HStack alignItems={'flex-start'} gap={1}>
                <Box flex={[4, 5]} >
                    <VStack bg='' alignItems={'flex-start'} gap={1}>

                        <CustomHeading
                            variant={'h1'}
                            size={fontSize.h1}
                            fontWeight={'600'}
                            defaultValue={'Full Name '}
                            name='fullName'
                            value={fullName}
                            isEditable={editableFields}
                            allowEnter
                            onChangeCallback={(name, value) => onChangeHandler(name, value)}
                        />
                        <CustomHeading
                            variant={'h2'}
                            size={fontSize.h2}
                            fontWeight={'600'}
                            defaultValue={'Your position'}
                            name='position'
                            value={position}
                            isEditable={editableFields}
                            onChangeCallback={(name, value) => onChangeHandler(name, value)}
                        />
                    </VStack>

                </Box>
                <Box flex={['1', '2']}>
                    <Box bg='' border={'0px solid red'} justifyContent={'flex-end'} display={'flex'} >

                        <UserImage dispatch={dispatch} profileImage={profileImage} />

                    </Box>
                </Box>
            </HStack>
    } else {
        contentToShow =
            // render to pdf
            <div style={{ display: 'flex', flexDirection: 'row', gap: '0.25rem', alignItems: 'flex-start', width: '100%' }}>
                <div style={{ width: '75%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-start' }}>
                        <div style={{ width: '100%', paddingInline: '0.125rem' }}>
                            <CustomHeading
                                variant={'h1'}
                                size={fontSize.h1}
                                fontWeight={'600'}
                                defaultValue={'Full Name '}
                                name='fullName'
                                value={fullName}
                                isEditable={editableFields}
                                allowEnter
                                onChangeCallback={(name, value) => onChangeHandler(name, value)}
                            />

                        </div>
                        <div style={{ width: '100%', paddingInline: '0.125rem' }}>
                            <CustomHeading
                                variant={'h2'}
                                size={fontSize.h2}
                                fontWeight={'600'}
                                defaultValue={'Your position'}
                                name='position'
                                value={position}
                                isEditable={editableFields}
                                onChangeCallback={(name, value) => onChangeHandler(name, value)}
                            />

                        </div>
                    </div>
                </div>
                <div style={{ width: '25%', border: '0px solid red', display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '185px', maxWidth: '185px', }}>
                        {
                            profileImage
                                ?
                                <img src={profileImage} style={{ objectFit: 'cover', borderRadius: '0.75rem', width: '185px', maxWidth: '185px', }} alt='photo' />
                                : <div style={{ border: '1px solid #DEDEDE', width: '100%', height: '180px', backgroundColor: '#fafafa', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DADADA', fontSize: '12px' }}>profile photo</div>
                        }
                    </div>
                </div>
            </div>
    }

    return (
        contentToShow
    );
};

export default HeaderBlock;


const UserImage = ({ dispatch, profileImage, ref }) => {
    const inpRef = useRef();
    const themeColor = useSelector(state => state.editorSettings.themeColor);

    const uploadClickHandler = () => {
        inpRef.current.click();
    }

    const onChangeFilesHandler = async () => {
        if (inpRef.current.files) {
            let file = inpRef.current.files[0];
            let fileExt = (file.name).match(/(?=.)+(.png|.jpg|.jpeg)$/g)[0];

            switch (fileExt) {
                case '.jpg':
                case '.jpeg':
                case '.png':
                    let reader = new FileReader();
                    reader.addEventListener('loadend', () => {
                        if (reader.result) {
                            dispatch(setResumeHeaderData({ name: 'profileImage', value: reader.result }));
                        }
                    })
                    reader.readAsDataURL(file);
                    break;
                default:
                    console.log('incorrect file type..')
                    toaster.create({
                        type: 'error',
                        title: 'Error',
                        description: '.PNG, .JPG, .JPEG files allowed only.'
                    })
                    break;
            }
        }
    }

    const imageAnimation = {
        init: { opacity: 0 },
        show: { opacity: 1, transition: { delay: 0.8 } }
    }


    return (

        <Box style={{ minHeight: profileImage ? '180px' : '100px' }} >

            {
                !profileImage
                    ?
                    <motion.div layout key='inputGetUserImage'
                        variants={imageAnimation}
                        initial={'init'}
                        animate={'show'}
                    >
                        <input type={'file'} style={{ display: 'none' }} ref={inpRef} onChange={onChangeFilesHandler} accept={'.png, .jpg, .jpeg'} />
                        <Button variant={'subtle'} colorPalette={themeColor} size={['2xs', 'xs']} onClick={uploadClickHandler}>
                            <LuSquareUserRound />Profile Image
                        </Button>
                    </motion.div>

                    : <motion.div layout key='userImageShow'
                        variants={imageAnimation}
                        initial={'init'}
                        animate={'show'}
                    >
                        <Tooltip showArrow content="Click to Remove" openDelay={300} positioning={{ placement: 'bottom' }}>
                            <Image src={profileImage}
                                borderRadius={'xl'}
                                maxW={'185px'}
                                // minH='150px'
                                fit='cover'
                                alt='photo'
                                crossOrigin='anonymous'
                                onClick={() => {
                                    dispatch(setResumeHeaderData({ name: 'profileImage', value: null }));
                                }}
                                _hover={{ cursor: 'pointer' }}
                            />
                        </Tooltip>
                    </motion.div>
            }
        </Box>
    )
}

// const UserImageMotion = motion.create(UserImage);