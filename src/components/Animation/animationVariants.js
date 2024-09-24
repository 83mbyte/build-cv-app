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
    },
    slideX: {
        initial: (custom) => ({
            opacity: 0,
            x: custom ? custom * 0.4 : 50,
        }),
        animate: {
            opacity: 1,
            x: 0,
            transition: { delay: 0.2, duration: 0.8 }
        },
        exit: (custom) => ({
            opacity: 0,
            x: custom ? custom * (-0.4) : -50,
            transition: { delay: 0, duration: 0.8 }

        })
    },
    scaleCard: {
        initial: { transform: 'scale(0.75)', opacity: 0 },
        animate: { transform: 'scale(1)', opacity: 1, transition: { delay: 0.05, duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.2, delay: 0 } },
    },
    alertStretch: {
        initial: { transform: 'scaleY(0)', opacity: 0 },
        animate: { transform: 'scaleY(1)', opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
        exit: {
            transform: 'scaleY(0)',
            opacity: 0,
            transition: { delay: 0, duration: 0.1 }
        }
    }
}