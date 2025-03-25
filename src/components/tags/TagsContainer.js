import { HStack, Tag } from '@chakra-ui/react';
import React from 'react';

const TagsContainer = ({ tags = [], color = 'blue' }) => {
    return (
        <HStack bg=''>
            {
                tags.map((item, index) => {
                    return (
                        <Tag.Root key={index} colorPalette={color} variant={'surface'} size={'sm'}>
                            <Tag.Label>{item}</Tag.Label>
                        </Tag.Root>
                    )
                })
            }
        </HStack>
    );
};

export default TagsContainer;