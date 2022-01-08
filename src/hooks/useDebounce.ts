import {useCallback, useRef} from "react";

export default function useDebounce(callback: () => void, delay: number) {
    const timer = useRef<number>()

    return useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = +setTimeout(() => {
            callback()
        }, delay)
    },[callback, delay])
 }