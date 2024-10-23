import { Box, Stack } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTemplate } from '@/redux/features/templates/templatesSlice';

const TemplateSelection = () => {
    const dispatch = useDispatch();
    const templatesVariants = useSelector(state => state.templates.data.variants);
    const selected = useSelector(state => state.templates.data.selected);

    const onClickHandler = (data) => {
        dispatch(setSelectedTemplate(data));
    }

    return (
        <Stack direction={['row', 'column']} spacing={5} overflow={'scroll'} wrap={'nowrap'} h={['100%']} alignItems={'center'} >
            {
                templatesVariants.map((item) => {
                    return (
                        <Template
                            key={`template_${item.label}`}
                            item={item}
                            selected={selected}
                            onClickHandler={onClickHandler}
                        />
                    )
                })
            }
        </Stack>
    );
};

export default TemplateSelection;

const Template = ({ item, selected, onClickHandler }) => {
    return (
        <Box
            p={[1, 2]}
            border={'1px solid gray'}
            borderRadius={4}
            transition={'all 0.8s'}
            backgroundColor={selected === item.label ? 'teal' : 'white'}
            color={selected === item.label && 'white'}
            _hover={{ cursor: 'pointer', backgroundColor: 'teal', color: 'white' }}
            onClick={() => onClickHandler(item.label)}
            minWidth={'100px'}
            width={['100px', '75%']}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
        >
            <Box>{item.label}</Box>
            <Box>
                <img src={item.img} alt={item.label} />
            </Box>
        </Box>
    )
}