import {IChatMessage} from "../../models/IChatMessage";
import {useEffect, useRef} from "react";

export const useScrollDown = (dep: Array<IChatMessage>) => {

    let ref = useRef(null);
    let element: HTMLDivElement | null = null;

    const scrollToEnd = () => {
        element?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        if (ref) element = ref.current;
    }, [ref]);

    useEffect(() => {
        scrollToEnd();
    }, [dep]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            scrollToEnd();
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return {ref};
};