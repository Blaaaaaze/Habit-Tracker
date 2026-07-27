import { useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from './HabbitList.module.scss';
import { getActiveHabits, getCanceledHabits, getCompletedHabits } from "../task-selectors";

const HabbitList = () => {
    const activeHabits = useSelector(getActiveHabits);
    const completedHabits = useSelector(getCompletedHabits);
    const canceledHabits = useSelector(getCanceledHabits);

    return (
        <>
        <div className={styles.card__container}>
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
                    />
                })
                : <h2>Нет активных привычек</h2>
            }
        </div>
        <div className={styles.card__container}>
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
                    />
                })
                : <h2>Нет Завершенных привычек</h2>
            }
        </div>
        <div className={styles.card__container}>
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
                    />
                })
                : <h2>Нет Отмененных привычек</h2>
            }
        </div>
        </>
    )
}

export default HabbitList;