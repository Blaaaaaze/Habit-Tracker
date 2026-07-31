import styles from './Card.module.scss';

import { useEffect, useState } from 'react';
import {motion, AnimatePresence} from 'motion/react';
import { addProgress, changeStatus, clearProgress, deleteHabit } from '../tasks-slice';
import { useAppDispatch } from '../../../store';
import type { Habbit } from '../../../types/Habbit';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import Modal from '../../../components/Modal/Modal';



const Card = ({title, goal, score, id, status, updated_at}: Habbit) => {
    const [isModalOpen, setIsModalsOpen] = useState(false);
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

    const handleDeleteBtn = () => {
        setIsModalsOpen(true);
    }

    const completeDelete = () => {
        dispatch(deleteHabit(id));
        setIsModalsOpen(false);
    }

    const cancelDelete = () => {
        setIsModalsOpen(false);
    }

    useEffect(() => {
        if (score === goal) dispatch(changeStatus(id, 'completed'));
    }, [score, goal, dispatch, id])

    return (
        <motion.div 
            layout 
            className={styles.card}
            initial={{
                opacity: 0,
                scale: 0,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                scale: 0,
            }}
            transition={{
                layout: {
                    type: "spring",
                    stiffness: 180,
                    damping: 25
                },
                duration: 0.6,
            }}
        >
            <h2 className={styles.card__title}>{title}</h2>
            <button onClick={() => handleDeleteBtn()} className={styles['delete-btn']}>&times;</button>
            <div className={styles.card__bottom}>
                <p className={styles.card__result}>Ваш счёт: {score} / {goal} дней</p>
                <ProgressBar score={score} goal={goal} percentage={percentage} />
                <div className={styles['card__btn-container']}>
                    <AnimatePresence>
                        {
                            score < goal && status === 'progress'
                            ? (
                                <> 
                                <button onClick={() => dispatch(changeStatus(id, 'canceled'))} className={styles['card__cancel-btn']}>Отменить</button>
                                <AnimatePresence>
                                    {
                                        (updated_at !== new Date().toDateString()) && <motion.button 
                                            onClick={() => handleAddProgress(id)} 
                                            className={styles['card__complete-btn']}
                                            exit={{
                                                opacity: 0,
                                                scale: 0,
                                            }}
                                            transition={{
                                                duration: 0.3
                                            }}
                                            
                                        >Выполнить</motion.button>
                                    }
                                </AnimatePresence>
                                </>
                            )
                            : <button className={styles['card__repeat-btn']} onClick={() => handleRepeatHabbit(id)} >Повторить</button>
                        }
                    </AnimatePresence>
                </div>
            </div>
            {
                isModalOpen && <Modal onComplete={completeDelete} onCancel={cancelDelete}/>
            }
        </motion.div>
    )
}

export default Card;