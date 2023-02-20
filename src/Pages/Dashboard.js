import React, { useRef, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import SpinnerCustom from '../components/Spinner/SpinnerCustom';
import HeaderContainer from '../Sections/HeaderContainer';
import FormEditPage from './FormEditPage';
import ModalAnimated from '../__test_temp/ModalAnimated/ModalAnimated';
import { AnimatePresence } from 'framer-motion';
import { modalIsOpenToggle } from '../redux/features/utility/utilitySlice';
import ShowHTML from '../__test_temp/ShowHTML';

import * as htmlToImage from 'html-to-image';

const Dashboard = () => {
    const htmlRef = useRef();
    const loggedUser = useSelector(state => state.utility.auth.data);
    const isModalOpen = useSelector(state => state.utility.modalWindow.isOpen);

    const [imgData, setImgData] = useState(null);

    const dispatch = useDispatch();
    const modalToggler = () => {
        dispatch(modalIsOpenToggle())
    }

    const clickPreviewHandler = () => {

        let data = htmlRef.current.children[0].childNodes[0];
        // htmlToImage.toCanvas(data).then((canvas) => {
        //     console.log(canvas);
        //     // document.body.appendChild(canvas);
        //     setImgData(canvas);
        //     modalToggler();
        // })
        htmlToImage.toPng(data).then((dataUrl) => {
            let img = new Image();
            img.src = dataUrl;
            setImgData(img);
            modalToggler();

        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

    }
    return (
        <>
            {
                loggedUser
                    ? <>
                        <HeaderContainer user={loggedUser.userId} clickPreviewHandler={clickPreviewHandler} />

                        <Container as='main' bg={'white'} maxW={'3xl'} p={0}  >
                            <FormEditPage loggedUser={loggedUser.userId} />

                        </Container>

                        <AnimatePresence initial={false}>
                            {
                                isModalOpen && <ModalAnimated key={'modal'} handleClose={modalToggler} imgData={imgData} isOpen={isModalOpen} />
                            }
                        </AnimatePresence>
                        <Box position={'fixed'} top='0' left={'100%'} w="100%" ref={htmlRef} minW='800px'>
                            <ShowHTML />
                        </Box>
                    </>
                    : <SpinnerCustom />
            }
        </>
    );
};

export default Dashboard;