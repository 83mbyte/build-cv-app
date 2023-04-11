
import React, { useEffect, useRef } from 'react';

import { Box, Button, Image, Skeleton } from '@chakra-ui/react';
import { MdOutlineMonochromePhotos } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImageData, getUserImage, uploadImageData } from '../../redux/features/userImage/userImageSlice';
import ToolTip from '../Tooltip/ToolTip';

const ProfilePhoto = ({ user }) => {

    const inpRef = useRef();
    const dispatch = useDispatch();
    const data = useSelector(state => state.image.data);
    const status = useSelector(state => state.image.status);

    const uploadClickHandler = () => {
        inpRef.current.click();
    }
    const imageOnClickHandler = async () => {
        dispatch(deleteImageData({ user }));
        console.log('image removed..')
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
                            dispatch(uploadImageData({ user, imageData: reader.result }))
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
        if (status === 'idle') {
            dispatch(getUserImage(user))
        }
    }, [user, status, dispatch])

    return (
        <>
            {
                status !== 'ready'
                    ? <Skeleton height={'65px'} w={'50px'} />
                    :
                    <>
                        {
                            !data.value || data.value === ''
                                ? <>
                                    <input type={'file'} style={{ display: 'none' }} ref={inpRef} onChange={onChangeHandler} accept={'.png, .jpg, .jpeg'} />
                                    <Button size={'xs'} colorScheme='teal' leftIcon={<MdOutlineMonochromePhotos />} onClick={uploadClickHandler}>Upload photo</Button>
                                </>
                                : <Box w={'50px'} h={'65px'} onClick={imageOnClickHandler} cursor={'pointer'}>
                                    <ToolTip label='click to delete photo' type={'warning'}  >
                                        <Image src={`${data.value}`} alt='user_photo' objectFit='cover' w={'50px'} h={'65px'} />
                                    </ToolTip>
                                </Box>
                        }
                    </>
            }
        </>
    );
};

export default ProfilePhoto;