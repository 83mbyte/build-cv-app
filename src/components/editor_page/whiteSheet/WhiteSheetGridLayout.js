import React from 'react';
import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { motion, LayoutGroup } from 'motion/react';

import { useSelector } from 'react-redux';
import HeaderBlock from '../resumeBlocks/HeaderBlock';
import ContactBlock from '../resumeBlocks/ContactBlock';
import SummaryBlock from '../resumeBlocks/SummaryBlock';
import EducationBlock from '../resumeBlocks/EducationBlock';
import ExperienceBlock from '../resumeBlocks/ExperienceBlock';
import SkillsBlock from '../resumeBlocks/SkillsBlock';
import LanguagesBlock from '../resumeBlocks/LanguagesBlock';


const gridTemplates = {
    0: {
        template: `'header'
        'center' 
        'footer'`,
        columns: `1fr`
    },
    1: {
        template: `'header header'
        'extra center'
        'footer footer'`,
        columns: '1fr 2fr'
    },
    2: {
        template: `'header header'
        'center extra'
        'footer footer'`,
        columns: `2fr 1fr`
    },
}

const GridItemsBottomMargin = '3';
const itemsBlockSpacing = '8';


const WhiteSheetGridLayout = ({ editableFields }) => {
    const layoutNumber = useSelector(state => state.editorSettings.layout);
    if (editableFields != false) {
        return (

            <DocumentLayoutAnimated
                layoutNumber={layoutNumber}
                headerBlock={<HeaderBlock editableFields={editableFields} />}
                contactBlock={<ContactBlock editableFields={editableFields} layoutNumber={layoutNumber} />}
                summaryBlock={<SummaryBlock editableFields={editableFields} />}
                educationBlock={<EducationBlock editableFields={editableFields} />}
                experienceBlock={<ExperienceBlock editableFields={editableFields} />}
                skillsBlock={<SkillsBlock editableFields={editableFields} layoutNumber={layoutNumber} />}
                languagesBlock={<LanguagesBlock editableFields={editableFields} layoutNumber={layoutNumber} />}

            />
        )
    } else {
        return (
            <DocumentLayoutNotAnimated
                layoutNumber={layoutNumber}
                headerBlock={<HeaderBlock editableFields={editableFields} />}
                contactBlock={<ContactBlock editableFields={editableFields} layoutNumber={layoutNumber} />}
                summaryBlock={<SummaryBlock editableFields={editableFields} />}
                educationBlock={<EducationBlock editableFields={editableFields} />}
                experienceBlock={<ExperienceBlock editableFields={editableFields} />}
                skillsBlock={<SkillsBlock editableFields={editableFields} layoutNumber={layoutNumber} />}
                languagesBlock={<LanguagesBlock editableFields={editableFields} layoutNumber={layoutNumber} />}
            />
        )
    }

};

export default WhiteSheetGridLayout;


// Animated components to use in DocumentLayoutAnimated
// const DocumentLayoutAnimated = ({ layoutNumber, headerBlock, contactBlock, summaryBlock, educationBlock, experienceBlock, skillsBlock, languagesBlock }) => {
const DocumentLayoutAnimated = ({ layoutNumber, headerBlock, contactBlock, summaryBlock, educationBlock, experienceBlock, skillsBlock, languagesBlock }) => {

    return (
        <LayoutGroup id={'animatedLayoutGridGroup'}>
            <Grid
                width='full'
                gap={2}
                templateAreas={gridTemplates[layoutNumber].template}
                templateColumns={gridTemplates[layoutNumber].columns}
            >
                {/* Header area */}
                <GridItemAnimated layout area='header' key={'header'} bg='' id={'header'} marginBottom={GridItemsBottomMargin}
                    transition={{ type: 'spring', stiffness: 100 }}>
                    {headerBlock}
                </GridItemAnimated>

                {/* Center area */}
                <GridItemAnimated layout area='center' key={'center'} bg='' id={'center'} marginBottom={GridItemsBottomMargin} transition={{ type: 'spring', stiffness: 100 }}>

                    <VStack w='full' bg='' alignItems={'flex-start'} justifyContent={'center'} gap={itemsBlockSpacing}>
                        {
                            layoutNumber == 0 &&
                            <AnimatedBlockWrapper id={'contactBlockCenterArea'} >
                                {contactBlock}
                            </AnimatedBlockWrapper>
                        }
                        <AnimatedBlockWrapper id={'summaryCenterCenterArea'}>
                            {summaryBlock}
                        </AnimatedBlockWrapper>

                        <AnimatedBlockWrapper id={'educationBlockCenterArea'}>
                            {educationBlock}
                        </AnimatedBlockWrapper>
                        <AnimatedBlockWrapper id='experienceBlock'>
                            {experienceBlock}
                        </AnimatedBlockWrapper>
                        {
                            layoutNumber == 0 &&
                            <AnimatedBlockWrapper id={'skillsBlock'} >
                                {skillsBlock}
                            </AnimatedBlockWrapper>
                        }
                        {
                            layoutNumber == 0 &&
                            <AnimatedBlockWrapper id={'languagesBlock'} >
                                {languagesBlock}
                            </AnimatedBlockWrapper>
                        }
                    </VStack>
                </GridItemAnimated>

                <GridItemAnimated layout area='footer' key={'footer'} bg='green' id={'footer'} marginBottom={GridItemsBottomMargin} transition={{ type: 'spring', stiffness: 100 }}>
                    footer
                </GridItemAnimated>

                {
                    layoutNumber != 0 &&
                    <GridItemAnimated layout area='extra' key={'extra'} bg='' id={'extra'} marginBottom={GridItemsBottomMargin} transition={{ type: 'spring', stiffness: 100 }}>

                        <VStack w='full' bg='' alignItems={'flex-start'} justifyContent={'center'} gap={itemsBlockSpacing}>
                            <AnimatedBlockWrapper id={'contactBlock'} >
                                {contactBlock}
                            </AnimatedBlockWrapper>
                            <AnimatedBlockWrapper id={'skillsBlock'} >
                                {skillsBlock}
                            </AnimatedBlockWrapper>
                            <AnimatedBlockWrapper id={'languagesBlock'} >
                                {languagesBlock}
                            </AnimatedBlockWrapper>
                        </VStack>
                    </GridItemAnimated>
                }

            </Grid>
        </LayoutGroup>
    )
};

const GridItemToAnimate = ({ id, area, bg, marginBottom, ref, children }) => {
    return (
        <GridItem ref={ref} key={id} area={area} bg={bg} marginBottom={marginBottom}>
            {children}
        </GridItem>
    )
};

const GridItemAnimated = motion.create(GridItemToAnimate);

const AnimatedBlockWrapper = ({ id, children }) => {
    return (
        <motion.div key={id} id={id}
            style={{ width: '100%' }}
            initial={{ opacity: 0 }}
            layoutId={id}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
        >
            {children}
        </motion.div>
    )
};

// 
// not animated components to use in DocumentLayout
const DocumentLayoutNotAnimated = ({ layoutNumber, headerBlock, contactBlock, summaryBlock, educationBlock, experienceBlock, skillsBlock, languagesBlock }) => {
    const suffForIds = '_notAnimate';

    return (
        <LayoutGroup id={`layoutGridGroup_${suffForIds}`}>
            <Grid
                width='full'
                gap={2}
                templateAreas={gridTemplates[layoutNumber].template}
                templateColumns={gridTemplates[layoutNumber].columns}
            >
                {/* Header area */}
                <GridItem area='header' key={`header_${suffForIds}`} bg='' id={`header_${suffForIds}`} marginBottom={itemsBlockSpacing}>
                    {headerBlock}
                </GridItem>

                {/* Center area */}
                <GridItem area='center' key={`center_${suffForIds}`} bg='' id={`center_${suffForIds}`} marginBottom={itemsBlockSpacing}>

                    <VStack w='full' bg='' alignItems={'flex-start'} justifyContent={'center'} gap={itemsBlockSpacing}>
                        {
                            layoutNumber == 0 && contactBlock
                        }
                        {summaryBlock}
                        {educationBlock}
                        {experienceBlock}
                        {
                            layoutNumber == 0 &&
                            <>
                                {skillsBlock}
                                {languagesBlock}
                            </>
                        }
                    </VStack>
                </GridItem>

                {
                    layoutNumber != 0 &&
                    <GridItem area='extra' key={`extra_${suffForIds}`} bg='' id={`extra_${suffForIds}`} marginBottom={itemsBlockSpacing}>
                        <VStack w='full' bg='' alignItems={'flex-start'} justifyContent={'center'} gap={itemsBlockSpacing}>
                            {contactBlock}
                            {skillsBlock}
                            {languagesBlock}
                        </VStack>
                    </GridItem>
                }

            </Grid>
        </LayoutGroup >
    )
};