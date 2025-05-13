import { useEffect } from 'react';
import {
    Box,
    Text,
    IconButton,
    Accordion,

} from '@chakra-ui/react';

import { motion } from 'motion/react';

import { LuRefreshCw } from "react-icons/lu";
import { getDataFromFunctionsEndpoint } from '@/lib/commonScripts';
import { Tooltip } from '../ui/tooltip';
import { toaster } from '../ui/toaster';
import CardWrapper from './CardWrapper';

const ContactBlock = ({ ref, contactAllData, setContactAllData }) => {
    const getContactAllData = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ variant: 'getContactAllData' }),
        };

        const respond = await getDataFromFunctionsEndpoint('controlCenterActions', options);

        if (respond) {
            let res = await respond.json();
            if (!res || res.status !== 'Success') {
                console.log('error while getting contact_form data')
                toaster.create({
                    type: 'alert',
                    description: 'error while getting contact form data',
                    duration: 3000
                })
            } else if (res && res.status == 'Success') {

                setContactAllData(res.data)
            }
        } else {
            console.log('no response from server');
            setContactAllData(null);
        }
    }

    useEffect(() => {
        if (!contactAllData) {
            getContactAllData();
        }
    }, []);

    return (
        <CardWrapper ref={ref}>
            <Box>
                <Tooltip showArrow content="Refresh Messages List" openDelay={300} positioning={{ placement: 'bottom' }} >
                    <IconButton colorPalette={'teal'} onClick={getContactAllData} variant={'solid'}>
                        <LuRefreshCw />
                    </IconButton>
                </Tooltip>
            </Box>

            <Accordion.Root variant={'plain'} collapsible bg='' gap={10}>
                {
                    contactAllData &&
                    Object.keys(contactAllData).map((folder, index) => {

                        return (
                            <Accordion.Item key={index} value={folder}>
                                <Accordion.ItemTrigger>
                                    <Text flex="1">{folder}</Text>
                                    <Accordion.ItemIndicator />
                                </Accordion.ItemTrigger>
                                <Accordion.ItemContent>
                                    <Accordion.ItemBody>

                                        <Accordion.Root variant={'subtle'} collapsible bg='' pl={4} size={'sm'}>
                                            {
                                                Object.keys(contactAllData[folder]).map((item, itemIndex) => {

                                                    return (
                                                        <Accordion.Item key={itemIndex} value={item}>
                                                            <Accordion.ItemTrigger>
                                                                <Text flex="1" fontSize={'xs'}>{item}</Text>
                                                                <Accordion.ItemIndicator />
                                                            </Accordion.ItemTrigger>
                                                            <Accordion.ItemContent>
                                                                <Accordion.ItemBody>
                                                                    <Text fontSize={'xs'}>
                                                                        {contactAllData[folder][item].message}
                                                                    </Text>
                                                                </Accordion.ItemBody>
                                                            </Accordion.ItemContent>
                                                        </Accordion.Item>
                                                    )
                                                })
                                            }
                                        </Accordion.Root>

                                    </Accordion.ItemBody>
                                </Accordion.ItemContent>
                            </Accordion.Item>
                        )
                    })
                }
            </Accordion.Root>
        </CardWrapper>
    );
};


const MotionContactBlock = motion.create(ContactBlock)
export default MotionContactBlock;