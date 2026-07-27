import type { Habbit, HabbitStatus } from "../../types/Habbit";
import Card from "../Card/Card";
import styles from './HabbitList.module.scss';

interface HabbitListProps {
    habbits: Habbit[],
    addProgress: (id: string, newScore: number) => void,
    changeStatus: (id: string, newStatus: HabbitStatus) => void,
    deleteHabbit: (id: string) => void
}

const HabbitList = ({habbits, addProgress, changeStatus, deleteHabbit}: HabbitListProps) => {
    return (
        <div className={styles.card__container}>
            {
                habbits.map(habbit => {
                    return <Card 
                        key={habbit.id}
                        id={habbit.id}
                        title={habbit.title} 
                        goal={habbit.goal} 
                        score={habbit.score}
                        status={habbit.status}
                        addProgress={addProgress}
                        changeStatus={changeStatus}
                        deleteHabbit={deleteHabbit}
                    />
                })
            }
        </div>
    )
}

export default HabbitList;