import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
    score: number,
    goal: number,
    percentage: number
}

const ProgressBar = ({score, goal, percentage}: ProgressBarProps) => {
    const selectColor = (currentResult: number, goal: number) => {
        if (currentResult < (goal / 100 * 33)) return styles.low;
        if (currentResult > goal / 100 * 33 && currentResult < goal / 100 * 66) return styles.medium;
        if (currentResult > goal / 100 * 66) return styles.high;
        return ''
    }
    
    return (
        <div className={styles.bar}>
            <div className={`
                ${styles.progress}
                ${selectColor(score, goal)}
                `}
                style={{'--progress-width': `${percentage}%`} as React.CSSProperties}
                ></div>
        </div>
    )
}

export default ProgressBar;