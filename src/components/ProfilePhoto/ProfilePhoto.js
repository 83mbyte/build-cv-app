import { Box, Button, Image, Skeleton, } from '@chakra-ui/react';
import React, { useRef, useEffect } from 'react';
import { MdOutlineMonochromePhotos } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { deleteImageData, getImageData, uploadImageData } from '../../redux/features/image/imageSlice';

import ToolTip from '../ToolTip/ToolTip';

const ProfilePhoto = ({ user }) => {
    const inpRef = useRef();

    const dispatch = useDispatch();


    const data = useSelector(state => state.image.data);
    const stateStatus = useSelector(state => state.image.status);
    const error = useSelector(state => state.image.error);


    const uploadClickHandler = () => {
        inpRef.current.click();
    }
    const imageOnClickHandler = async () => {
        dispatch(deleteImageData(user))
    }
    const onChangeHandler = async () => {
        if (inpRef.current.files) {
            let file = inpRef.current.files[0];
            let fileExt = (file.name).match(/(?=.)+(.png|.jpg|.jpeg)$/g)[0];

            switch (fileExt) {
                case '.jpg':
                case '.jpeg':
                case '.png':
                    console.log('correct file.');
                    let reader = new FileReader();
                    reader.addEventListener('loadend', () => {
                        if (reader.result) {
                            dispatch(uploadImageData({ imageData: reader.result, user }));
                        }
                    })
                    reader.readAsDataURL(file);
                    break;
                default:
                    console.log('incorrect file type..')
                    break;
            }
        }
    }


    useEffect(() => {
        if (stateStatus === 'idle') {
            dispatch(getImageData(user))
        }
    }, [stateStatus, dispatch, user])

    return (
        <Box >
            {
                !data.encoded
                    ? <>
                        <input type={'file'} style={{ display: 'none' }} ref={inpRef} onChange={onChangeHandler} accept={'.png, .jpg, .jpeg'} />
                        <Button size={'xs'} colorScheme='teal' leftIcon={<MdOutlineMonochromePhotos />} onClick={uploadClickHandler}>Upload photo</Button>
                    </>
                    : <Box w={'50px'} h={'65px'} onClick={imageOnClickHandler} cursor={'pointer'}    >

                        <ToolTip label='click to delete photo' type={'warning'}  >
                            <Image src={`${data.encoded}`} alt='user_photo' objectFit='cover' w={'50px'} h={'65px'} fallback={<Skeleton h={'65px'} />} />
                        </ToolTip>
                    </Box>
            }
        </Box>
    );
};

export default ProfilePhoto;