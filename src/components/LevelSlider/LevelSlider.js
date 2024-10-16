import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import { useState } from 'react';
const changeColor = (val) => {
    switch (val) {
        case 1:
            return 'gray.300'
        case 2:
            return 'pink.300'
        case 3:
            return 'orange.300'
        case 4:
            return 'teal.300'
        case 5:
            return 'teal.500'
        default:
            return 'orange.300'
    }
}
const LevelSlider = ({ defValue, levelLabel, onChangeCallback, isDisabled = false }) => {

    const [color, setColor] = useState(changeColor(defValue));

    return (
        <Box px={3}>
            <Text color={'gray.500'} px={3} fontSize="sm"  >Level:  <Text as={'span'} color={color}>{levelLabel}</Text></Text>
            <Box>
                <Slider
                    min={1}
                    max={5}
                    step={1}
                    isDisabled={isDisabled}
                    defaultValue={defValue}
                    onChange={(value) => {
                        onChangeCallback(value);
                        setColor(changeColor(value));
                    }}
                >
                    <SliderTrack bg={'gray.300'}>
                        {
                            <SliderFilledTrack bg={color} />
                        }
                    </SliderTrack>
                    <SliderThumb></SliderThumb>

                </Slider>
            </Box>
        </Box>
    );
};

export default LevelSlider;