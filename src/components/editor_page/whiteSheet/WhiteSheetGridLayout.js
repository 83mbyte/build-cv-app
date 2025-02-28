import React, { Suspense, lazy } from 'react';
import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { motion, LayoutGroup } from 'motion/react';

import { useSelector } from 'react-redux';
import HeaderBlock from '../resumeBlocks/HeaderBlock';
import ContactBlock from '../resumeBlocks/ContactBlock';
import FallbackSpinner from '../FallbackSpinner';


const SummaryBlock = lazy(() => import('../resumeBlocks/SummaryBlock'));
const EducationBlock = lazy(() => import('../resumeBlocks/EducationBlock'));
const ExperienceBlock = lazy(() => import('../resumeBlocks/ExperienceBlock'));
const SkillsBlock = lazy(() => import('../resumeBlocks/SkillsBlock'));
const LanguagesBlock = lazy(() => import('../resumeBlocks/LanguagesBlock'));

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
    const resumeSummaryVisible = useSelector(state => state.resumeSummary.isVisible);
    const resumeEducationVisible = useSelector(state => state.resumeEducation.isVisible);
    const resumeExperienceVisible = useSelector(state => state.resumeExperience.isVisible);
    const resumeSkillsVisible = useSelector(state => state.resumeSkills.isVisible);
    const resumeLanguagesVisible = useSelector(state => state.resumeLanguages.isVisible);

    if (editableFields != false) {
        return (

            <DocumentLayoutAnimated
                layoutNumber={layoutNumber}
                headerBlock={<HeaderBlock editableFields={editableFields} />}
                contactBlock={<ContactBlock editableFields={editableFields} layoutNumber={layoutNumber} />}
                summaryBlock={resumeSummaryVisible ? <Suspense fallback={<FallbackSpinner />}><SummaryBlock editableFields={editableFields} /></Suspense> : null}
                educationBlock={resumeEducationVisible ? <Suspense fallback={<FallbackSpinner />}><EducationBlock editableFields={editableFields} /></Suspense> : null}
                experienceBlock={resumeExperienceVisible ? <Suspense fallback={<FallbackSpinner />}><ExperienceBlock editableFields={editableFields} /></Suspense> : null}
                skillsBlock={resumeSkillsVisible ? <Suspense fallback={<FallbackSpinner />}><SkillsBlock editableFields={editableFields} layoutNumber={layoutNumber} /></Suspense> : null}
                languagesBlock={resumeLanguagesVisible ? <Suspense fallback={<FallbackSpinner />}><LanguagesBlock editableFields={editableFields} layoutNumber={layoutNumber} /></Suspense> : null}

            />
        )
    } else {
        return (
            <DocumentLayoutNotAnimated
                layoutNumber={layoutNumber}
                headerBlock={<HeaderBlock editableFields={editableFields} />}
                contactBlock={<ContactBlock editableFields={editableFields} layoutNumber={layoutNumber} />}
                summaryBlock={resumeSummaryVisible ? <Suspense fallback={<FallbackSpinner />}><SummaryBlock editableFields={editableFields} /></Suspense> : null}
                educationBlock={resumeEducationVisible ? <Suspense fallback={<FallbackSpinner />}><EducationBlock editableFields={editableFields} /></Suspense> : null}
                experienceBlock={resumeExperienceVisible ? <Suspense fallback={<FallbackSpinner />}><ExperienceBlock editableFields={editableFields} /></Suspense> : null}
                skillsBlock={resumeSkillsVisible ? <Suspense fallback={<FallbackSpinner />}><SkillsBlock editableFields={editableFields} layoutNumber={layoutNumber} /></Suspense> : null}
                languagesBlock={resumeLanguagesVisible ? <Suspense fallback={<FallbackSpinner />}><LanguagesBlock editableFields={editableFields} layoutNumber={layoutNumber} /></Suspense> : null}
            />
        )
    }

};

export default WhiteSheetGridLayout;


// Animated components to use in DocumentLayoutAnimated
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
                        {
                            summaryBlock &&
                            <AnimatedBlockWrapper id={'summaryCenterCenterArea'}>
                                {summaryBlock}
                            </AnimatedBlockWrapper>
                        }

                        {
                            educationBlock &&
                            <AnimatedBlockWrapper id={'educationBlockCenterArea'}>
                                {educationBlock}
                            </AnimatedBlockWrapper>}
                        {
                            experienceBlock &&
                            <AnimatedBlockWrapper id='experienceBlock'>
                                {experienceBlock}
                            </AnimatedBlockWrapper>
                        }
                        {
                            (layoutNumber == 0 && skillsBlock) &&
                            <AnimatedBlockWrapper id={'skillsBlock'}>
                                {skillsBlock}
                            </AnimatedBlockWrapper>
                        }
                        {
                            (layoutNumber == 0 && languagesBlock) &&
                            <AnimatedBlockWrapper id={'languagesBlock'}>
                                {languagesBlock}
                            </AnimatedBlockWrapper>
                        }
                    </VStack>
                </GridItemAnimated>

                <GridItemAnimated layout area='footer' key={'footer'} bg='green' id={'footer'} marginBottom={GridItemsBottomMargin} transition={{ type: 'spring', stiffness: 100 }}>
                    footer
                </GridItemAnimated>

                {/* Extra area */}
                {
                    layoutNumber != 0 &&
                    <GridItemAnimated layout area='extra' key={'extra'} bg='' id={'extra'} marginBottom={GridItemsBottomMargin} transition={{ type: 'spring', stiffness: 100 }}>

                        <VStack w='full' bg='' alignItems={'flex-start'} justifyContent={'center'} gap={itemsBlockSpacing}>
                            <AnimatedBlockWrapper id={'contactBlock'} >
                                {contactBlock}
                            </AnimatedBlockWrapper>
                            {
                                skillsBlock &&
                                <AnimatedBlockWrapper id={'skillsBlock'} >
                                    {skillsBlock}
                                </AnimatedBlockWrapper>
                            }
                            {
                                languagesBlock &&
                                <AnimatedBlockWrapper id={'languagesBlock'} >
                                    {languagesBlock}
                                </AnimatedBlockWrapper>
                            }
                        </VStack>
                    </GridItemAnimated>
                }

            </Grid>
        </LayoutGroup >
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

        <div style={{ border: '0px solid #dedede', minWidth: '593pt', width: '593pt', maxWidth: '593pt', minHeight: '842pt', padding: '0rem' }}  >

            <div style={{
                display: 'grid',
                backgroundColor: '',
                gridTemplateAreas: gridTemplates[layoutNumber].template,
                gridTemplateColumns: gridTemplates[layoutNumber].columns,
                gap: '10px',
                width: '100%'
            }}>
                <div style={{ gridArea: 'header', backgroundColor: '', marginBottom: '0.75rem' }} id={`header_${suffForIds}`}>
                    {headerBlock}
                </div>

                <div style={{ gridArea: 'center', backgroundColor: '', marginBottom: '0.75rem' }} id={`center_${suffForIds}`}>
                    <div style={{ display: 'flex', width: '100%', gap: '2rem', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' }}>
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
                    </div>

                </div>
                {
                    layoutNumber != 0 &&
                    <div style={{ gridArea: 'extra', marginBottom: '0.75rem' }} bg='' id={`extra_${suffForIds}`}>
                        <div style={{ display: 'flex', width: '100%', gap: '2rem', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                            {contactBlock}
                            {skillsBlock}
                            {languagesBlock}
                        </div>

                    </div>
                }

                <div style={{ gridArea: 'footer', backgroundColor: 'aqua' }}>footer</div>
            </div>

        </div>
    )
};
