import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem, Button
} from '@chakra-ui/react';

import React from 'react';

import { ExpandIcon } from '../Icons/Icon';
const SelectCustom = ({ path, value, itemsArray, handleInputChange }) => {
    const clickHandle = (e, value) => {
        e.preventDefault();
        handleInputChange(path, value)
    }
    return (
        <Menu matchWidth={true} preventOverflow={true} boundary={'scrollParent'}>
            {({ isOpen }) => (
                <>
                    <MenuButton
                        isActive={isOpen}
                        as={Button}
                        size={['xs', 'md', 'md']}
                        mx={['8px', null, null]}
                        rightIcon={<ExpandIcon />}
                        bg="white"
                        border={'1px solid rgb(226, 232, 240)'}
                        _hover={{ borderColor: '#cbd5e0', color: 'teal.500' }}
                        _expanded={{ bg: 'gray.100' }}
                        color={isOpen ? 'teal.500' : 'gray.300'}
                        transition='all 0.3s'
                    >
                        {value}
                    </MenuButton>
                    <MenuList>
                        {
                            itemsArray.map((item, index) => {
                                return <MenuItem fontSize={'xs'} key={index} onClick={(e) => clickHandle(e, item)}> {item}</MenuItem>
                            })
                        }
                    </MenuList>
                </>
            )
            }
        </Menu >


    );
};

export default SelectCustom;