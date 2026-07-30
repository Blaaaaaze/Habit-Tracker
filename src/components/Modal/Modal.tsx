import styles from './Modal.module.scss';

interface ModalProps {
    onComplete: () => void,
    onCancel: () => void;
}

const Modal = ({onComplete, onCancel}: ModalProps) => {
    return (
        <div className={styles.overlay} onClick={() => onCancel()}>
            <div className={styles.modal}>
                <h2>Подтвердите действие</h2>
                <div className={styles['btn-container']}>
                    <button className={styles['cancel-btn']} onClick={() => onCancel()}>Отменить</button>
                    <button className={styles['complete-btn']} onClick={() => onComplete()}>Подтверить</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;