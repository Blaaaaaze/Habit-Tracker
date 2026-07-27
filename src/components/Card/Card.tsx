import styles from './Card.module.scss';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useEffect, useState } from 'react';
import type { Habbit, HabbitStatus } from '../../types/Habbit';

interface CardProps extends Habbit {
    addProgress: (id: string, newScore: number) => void,
    changeStatus: (id: string, newStatus: HabbitStatus) => void,
    deleteHabbit: (id: string) => void
}

const Card = ({title, goal, score, id, status, addProgress, changeStatus, deleteHabbit}: CardProps) => {
    const [percentage, setPercentage] = useState(Math.min(Math.max((score / goal) * 100, 0), 100));

    const handleAddProgress = (id: string) => {
        if (score < goal) {
            const newScore = score + 1
            addProgress(id, newScore);
            setPercentage(Math.min(Math.max((newScore / goal) * 100, 0), 100));
            return;
        }
    }

    const handleRepeatHabbit = (id: string) => {
        changeStatus(id, 'progress')
        addProgress(id, 0);
        setPercentage(0);
    }

    useEffect(() => {
        if (score === goal) changeStatus(id, 'completed');
    }, [score])

    return (
        <div className={styles.card}>
            <h2 className={styles.card__title}>{title}</h2>
            <button onClick={() => deleteHabbit(id)} className={styles['delete-btn']}>&times;</button>
            <p className={styles.card__result}>Ваш счёт: {score} / {goal}</p>
            <ProgressBar score={score} goal={goal} percentage={percentage} />
            <div className={styles['card__btn-container']}>
            {
                score < goal && status === 'progress'
                ? (
                    <>
                    <button onClick={() => handleAddProgress(id)} className={styles['card__complete-btn']}>Выполнить</button>
                    <button onClick={() => changeStatus(id, 'canceled')} className={styles['card__cancel-btn']}>Отменить</button>
                    </>
                )
                : <button className={styles['card__repeat-btn']} onClick={() => handleRepeatHabbit(id)} >Повторить</button>
            }
            </div>
        </div>
    )
}

export default Card;