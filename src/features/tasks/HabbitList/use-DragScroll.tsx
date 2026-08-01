import { useRef } from "react";

type hookReturn = [
    React.RefObject<HTMLDivElement | null>,
    (e: React.PointerEvent<HTMLDivElement>) => void,
    (e: React.PointerEvent<HTMLDivElement>) => void,
    () => void
]

const useDragScroll = (): hookReturn => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dragStatus = useRef({
        isDragging: false,
        startX: 0,
        scrollLeft: 0
    });

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;

        if (target.closest("button")) {
            return;
        }

        const container = containerRef.current;
        if (!container) return;

        dragStatus.current.isDragging = true;
        dragStatus.current.startX = e.clientX;
        dragStatus.current.scrollLeft = container.scrollLeft;

        container.setPointerCapture(e.pointerId);
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const container = containerRef.current;

        if (!container || !dragStatus.current.isDragging) return;

        const delta = e.clientX - dragStatus.current.startX;

        container.scrollLeft = dragStatus.current.scrollLeft - delta;
    }

    const stopDragging = () => {
        dragStatus.current.isDragging = false;
    }

    return [containerRef, handlePointerDown, handlePointerMove, stopDragging];
}

export default useDragScroll;