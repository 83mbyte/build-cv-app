import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';

const Switcher = ({ labelText, switchId, size = 'sm', toggleSwitchAction, isChecked }) => {
    const dispatch = useDispatch();
    const changeHandler = () => {
        dispatch(toggleSwitchAction());
    }
    return (
        <FormControl display='flex' alignItems='center' columnGap={2} m={0} p={0}>

            <Switch
                id={switchId}
                colorScheme={'teal'}
                size={size}
                aria-label={labelText}
                onChange={changeHandler}
                defaultChecked={false}
                isChecked={isChecked}
            />
            <FormLabel htmlFor={switchId} mb='0' fontSize={'xs'}>
                {labelText}
            </FormLabel>
        </FormControl>
    );
};



export default Switcher;