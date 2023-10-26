import {useEffect, useRef} from "react";

export const useScrollDown = (dep: any) => {

    let ref = useRef<HTMLDivElement>(null);

    const scrollToEnd = () => {
        ref.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {

        scrollToEnd();

    }, [dep]);

    return {ref};
};