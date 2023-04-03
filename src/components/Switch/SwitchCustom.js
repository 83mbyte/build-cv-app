import React from 'react';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react';

const SwitchCustom = ({ size, labelText, isChecked, toggleSwitch }) => {
    return (
        <FormControl display='flex' alignItems='center' columnGap={2} m={0} p={0}>
            <Switch
                id={'switchId'}
                colorScheme={'teal'}
                size={size}
                aria-label={labelText}
                onChange={toggleSwitch}
                defaultChecked={true}
                isChecked={isChecked}
            />
            <FormLabel htmlFor={'switchId'} mb='0' fontSize={'xs'}>
                {labelText}
            </FormLabel>
        </FormControl>
    );
};

export default SwitchCustom;