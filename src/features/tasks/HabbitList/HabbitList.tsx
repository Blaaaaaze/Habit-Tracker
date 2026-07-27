import { useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from './HabbitList.module.scss';
import { getHabits } from "../task-selectors";

const HabbitList = () => {
    const habits = useSelector(getHabits);

    return (
        <div className={styles.card__container}>
            {
                habits.map(habit => {
                    return <Card 
                        key={habit.id}
                        id={habit.id}
                        title={habit.title} 
                        goal={habit.goal} 
                        score={habit.score}
                        status={habit.status}
                        
                    />
                })
            }
        </div>
    )
}

export default HabbitList;