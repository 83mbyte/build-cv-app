'use client';

import { motion } from 'framer-motion';
import { uid } from 'uid/single';
import { animationVariants } from './animationVariants';

const AnimationWrapper = ({ width = 'auto', variant = 'opacity', whileInView = false, showOnce = false, children }) => {
    return (
        <motion.div
            key={uid()}
            variants={animationVariants[variant]}
            initial={'initial'}
            animate={whileInView ? null : 'animate'}
            whileInView={whileInView ? 'animate' : null}
            viewport={{ once: showOnce, }}
            style={{ width: width }}
        >
            {children}
        </motion.div>
    );
};

export default AnimationWrapper;