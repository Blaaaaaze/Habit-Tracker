import { useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from './HabbitList.module.scss';
import { getActiveHabits, getCanceledHabits, getCompletedHabits } from "../task-selectors";
import {AnimatePresence} from 'motion/react';
import { useEffect, useRef } from "react";

const HabbitList = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dragStatus = useRef({
        isDragging: false,
        startX: 0,
        scrollLeft: 0
    });

    const activeHabits = useSelector(getActiveHabits);
    const completedHabits = useSelector(getCompletedHabits);
    const canceledHabits = useSelector(getCanceledHabits);

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
    
    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify([...activeHabits, ...completedHabits, ...canceledHabits]));
    }, [activeHabits, canceledHabits, completedHabits]);

    return (
        <>
            <h2 className={styles['category-subtitle']}>Активные привычки</h2>
            <div
            ref={containerRef}
            className={styles.card__container}
            onPointerDown={(e) => handlePointerDown(e)}
            onPointerMove={(e) => handlePointerMove(e)}
            onPointerUp={() => stopDragging()}
            onPointerLeave={() => stopDragging()}
            onPointerCancel={() => stopDragging()}
            >
                <AnimatePresence >
                    {
                        activeHabits.length ? 
                        activeHabits.map(habit => {
                            return <Card
                                key={habit.id}
                                id={habit.id}
                                title={habit.title} 
                                goal={habit.goal} 
                                score={habit.score}
                                status={habit.status}
                                updated_at={habit.updated_at}
                            />
                        })
                        : null
                    }
                </AnimatePresence>
            </div>
            <h2 className={styles['category-subtitle']}>Завершенные привычки</h2>
            <div className={styles.card__container}>
                <AnimatePresence>
                    {
                        completedHabits.length ? 
                        completedHabits.map(habit => {
                            return <Card
                                key={habit.id}
                                id={habit.id}
                                title={habit.title} 
                                goal={habit.goal} 
                                score={habit.score}
                                status={habit.status}
                                updated_at={habit.updated_at}
                            />
                        })
                        : null
                    }
                </AnimatePresence>
            </div>
            <h2 className={styles['category-subtitle']}>Отмененные привычки</h2>
            <div className={styles.card__container}>
                <AnimatePresence>
                    {
                        canceledHabits.length ? 
                        canceledHabits.map(habit => {
                            return <Card
                                key={habit.id}
                                id={habit.id}
                                title={habit.title} 
                                goal={habit.goal} 
                                score={habit.score}
                                status={habit.status}
                                updated_at={habit.updated_at}
                            />
                        })
                        : null
                    }
                </AnimatePresence>
            </div>
        </>
    )
}

export default HabbitList;