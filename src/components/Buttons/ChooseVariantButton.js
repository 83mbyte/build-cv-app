import { Button } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { MdAdd } from 'react-icons/md';

const ChooseVariantButton = ({ value = '...', onButtonClickHandler }) => {
    const btnRef = useRef();
    const clickHandler = (e) => {
        e.preventDefault();
        onButtonClickHandler(btnRef.current.textContent)
    }
    return (
        <Button
            ref={btnRef}
            rightIcon={<MdAdd />}
            onClick={(e) => clickHandler(e)}
        >
            {value}
        </Button>
    );
};

export default ChooseVariantButton;