import { useState } from "react";
import { useAppDispatch } from "../../../store";
import { addProgress, changeStatus, clearProgress } from "../tasks-slice";

interface useProgressProps {
    goal: number,
    score: number
}

type useProgressReturn = [
    number,
    (id: string) => void,
    (id: string) => void
]

const useProgress = ({goal, score}: useProgressProps): useProgressReturn => {
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

    return [percentage, handleAddProgress, handleRepeatHabbit]
}

export default useProgress;