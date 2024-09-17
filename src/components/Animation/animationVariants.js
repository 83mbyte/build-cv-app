export const animationVariants = {
    opacity: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { delay: 0.3, delayChildren: 0.6, staggerChildren: 0.3, duration: 1 }
        },
        exit: { opacity: 0 },
    },
    slideDown: {
        initial: { y: -50, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: { delay: 0.3, duration: 0.8 }
        },
        exit: { y: -50, opacity: 0 }
    },
    slideUp: {
        initial: { y: 50, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: { delay: 0.3, duration: 0.8 }
        },
        exit: { y: 50, opacity: 0 }
    }
}