import Card from "../Card/Card";
import styles from './HabbitList.module.scss';
import {AnimatePresence} from 'motion/react';
import { useEffect} from "react";
import useHabitList from "./use-HabitList";
import useDragScroll from "./use-DragScroll";

const HabbitList = () => {
    const [activeHabits, completedHabits, canceledHabits] = useHabitList();
    const [containerRef, handlePointerDown, handlePointerMove, stopDragging] = useDragScroll();
    
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