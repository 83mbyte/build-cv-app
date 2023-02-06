import React, { useEffect, useState } from 'react';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Box,
    Text,
} from '@chakra-ui/react';
import { MdCode } from 'react-icons/md';


const LevelSlider = ({ skillName, value, path, handleInputChange, isDisabled = 'false' }) => {


    const [color, setColor] = useState(['orange.300', 'gray.100']);

    let defValue;

    switch (value) {
        case 'Novice':
            defValue = 0;
            break;
        case 'Beginner':
            defValue = 25;
            break;
        case 'Skillful':
            defValue = 50;
            break;
        case 'Experienced':
            defValue = 75;
            break;
        case 'Expert':
            defValue = 100;
            break;
        default:
            defValue = 50;
    }

    const levelGenerate = (value) => {
        switch (value) {
            case 0:
                return 'Novice';
            case 25:
                return 'Beginner'
            case 50:
                return 'Skillful'
            case 75:
                return 'Experienced'
            case 100:
                return 'Expert'
            default:
                return 'Skillful'
        }
    }

    const changeHandler = (val) => {
        handleInputChange(path, levelGenerate(val));
        if (val === 0) {
            setColor(['pink.300', 'gray.100'])
        }
        else if (val === 25) {
            setColor(['red.200', 'gray.100'])
        }
        else if (val === 50) {
            setColor(['orange.300', 'gray.100'])
        }
        else if (val === 75) {
            setColor(['teal.300', 'gray.100'])
        }
        else {
            setColor(['teal.500', 'gray.100'])
        }
    }
    const sliderColorsFromText = (val) => {
        if (val === 'Novice') {
            return ['pink.300', 'gray.100']
        }
        else if (val === 'Beginner') {
            return ['red.200', 'gray.100']
        }
        else if (val === 'Skillful') {
            return ['orange.300', 'gray.100']
        }
        else if (val === 'Experienced') {
            return ['teal.300', 'gray.100']
        }
        else {
            return ['teal.500', 'gray.100']
        }
    }
    useEffect(() => {
        setColor(sliderColorsFromText(value));
    }, [value])

    return (
        <Box px={2} bg='' h={'38px'} display='flex' flexDirection={'column'}>
            <Text color={'gray.500'} px={2} mx={3} mb={'-2px'}>Level - <Text as='span' color={color[0]}>{value}</Text><Text as='span' color={'gray.500'} fontSize="xs"> {isDisabled && '/disabled/'}</Text></Text>
            <Slider aria-label={`slider-${skillName}`} defaultValue={defValue} min={0} max={100} step={25} onChange={(val) => changeHandler(val)} border={'0px solid teal'} m={0} p={0} display={'flex'} flexDirection={'row'} isDisabled={isDisabled}  >

                <SliderTrack h="10px" bg={color[1]}>
                    {
                        <SliderFilledTrack bg={color[0]} />
                    }
                </SliderTrack>
                <SliderThumb boxSize={'18px'}  >
                    <Box as={MdCode} fill='teal'></Box>
                </SliderThumb>
            </Slider>
        </Box >
    );
};

export default LevelSlider;