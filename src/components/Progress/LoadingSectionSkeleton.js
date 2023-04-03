import React from 'react';
import { Grid, GridItem, Skeleton, Stack, Box } from '@chakra-ui/react';

const GridRow = () => {
    return (<>
        <GridItem >
            <Skeleton height={'30px'} />
        </GridItem>

    </>)
}

const LoadingSectionSkeleton = ({ rowsNumber, textArea = false }) => {

    const drawRows = () => {
        let arr = [];
        for (let i = 0; i < rowsNumber * 2; i++) {
            arr.push(<GridRow key={'gridRow_' + i} />);
        }
        return arr;
    }

    return (
        <>
            <Box p={'20px 10px'}>
                <Stack flex={1} spacing={2} bg='' mx={'10px'}>
                    <Grid templateColumns='repeat(2,1fr)' templateRows={`repeat(${rowsNumber}, 1fr)`} gap={5}>
                        <GridItem  >
                            <Skeleton height={'30px'} />
                        </GridItem>
                        <GridItem>
                        </GridItem>
                        {
                            drawRows().map((element) => {
                                return element
                            })
                        }
                    </Grid>
                    {
                        textArea && <Box pt={'10px'}><Skeleton height={'90px'} /></Box>
                    }
                </Stack>
            </Box>
        </>
    );
};

export default LoadingSectionSkeleton;