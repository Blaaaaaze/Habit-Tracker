import styles from './Card.module.scss';

import { useEffect, useState } from 'react';

import { addProgress, changeStatus, clearProgress, deleteHabit } from '../tasks-slice';
import { useAppDispatch } from '../../../store';
import type { Habbit } from '../../../types/Habbit';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';



const Card = ({title, goal, score, id, status, updated_at}: Habbit) => {
    const [percentage, setPercentage] = useState(Math.min(Math.max((score / goal) * 100, 0), 100));
    const dispatch = useAppDispatch();

    const handleAddProgress = (id: string) => {
        if (score < goal) {
            const newScore = score + 1
            dispatch(addProgress(id));
            
            setPercentage(Math.min(Math.max((newScore / goal) * 100, 0), 100));
            return;
        }
    }

    const handleRepeatHabbit = (id: string) => {
        dispatch(changeStatus(id, 'progress'))
        dispatch(clearProgress(id, ));
        setPercentage(0);
    }

    useEffect(() => {
        if (score === goal) dispatch(changeStatus(id, 'completed'));
    }, [score, goal, dispatch, id])

    return (
        <div className={styles.card}>
            <h2 className={styles.card__title}>{title}</h2>
            <button onClick={() => dispatch(deleteHabit(id))} className={styles['delete-btn']}>&times;</button>
            <p className={styles.card__result}>Ваш счёт: {score} / {goal}</p>
            <ProgressBar score={score} goal={goal} percentage={percentage} />
            <div className={styles['card__btn-container']}>
            {
                score < goal && status === 'progress'
                ? (
                    <> 
                    {
                        (updated_at !== new Date().toDateString()) 
                        ? <button onClick={() => handleAddProgress(id)} className={styles['card__complete-btn']}>Выполнить</button>
                        : null
                    }
                    <button onClick={() => dispatch(changeStatus(id, 'canceled'))} className={styles['card__cancel-btn']}>Отменить</button>
                    </>
                )
                : <button className={styles['card__repeat-btn']} onClick={() => handleRepeatHabbit(id)} >Повторить</button>
            }
            </div>
        </div>
    )
}

export default Card;