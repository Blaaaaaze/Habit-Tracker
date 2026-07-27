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
        <h2 className={styles['category-subtitle']}>Активные Привычки</h2>
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
                        updated_at={habit.updated_at}
                    />
                })
                : null
            }
        </div>
        <h2 className={styles['category-subtitle']}>Завершенные Привычки</h2>
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
                        updated_at={habit.updated_at}
                    />
                })
                : null
            }
        </div>
        <h2 className={styles['category-subtitle']}>Отмененные Привычки</h2>
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
                        updated_at={habit.updated_at}
                    />
                })
                : null
            }
        </div>
        </>
    )
}

export default HabbitList;