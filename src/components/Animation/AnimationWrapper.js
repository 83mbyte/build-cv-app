'use client'

import { motion } from 'framer-motion';
import { uid } from 'uid/single';
import { animationVariants } from './animationVariants';

const keyId = uid();

const AnimationWrapper = ({ width = 'auto', height = null, variant = 'opacity', whileInView = false, showOnce = false, custom = null, children }) => {

    return (
        <motion.div
            key={keyId}
            variants={animationVariants[variant]}
            initial={'initial'}
            custom={custom}
            animate={whileInView ? null : 'animate'}
            whileInView={whileInView ? 'animate' : null}
            exit={'exit'}
            viewport={{ once: showOnce, }}
            style={{ width: width, height: height, }}
        >
            {children}
        </motion.div>
    );
};

export default AnimationWrapper;