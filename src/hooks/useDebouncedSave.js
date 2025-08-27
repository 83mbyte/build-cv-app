import { useEffect, useRef } from 'react';

/**
 * A custom hook that debounces a callback function.
 * It will only call the callback after the delay has passed without the value changing.
 * @param {Function} callback The function to debounce.
 * @param {number} delay The debounce delay in milliseconds.
 * @param {*} value The value to watch for changes.
 */
export const useDebouncedSave = (callback, delay, value) => {
    const firstRender = useRef(true);
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Don't save on the initial render.
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [JSON.stringify(value), callback, delay]); // Use JSON.stringify to deep-compare the object
};

