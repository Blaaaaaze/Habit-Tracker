import { useSelector } from "react-redux";
import { getActiveHabits, getCanceledHabits, getCompletedHabits } from "../task-selectors";

const useHabitList = () => {
    const activeHabits = useSelector(getActiveHabits);
    const completedHabits = useSelector(getCompletedHabits);
    const canceledHabits = useSelector(getCanceledHabits);

    return [activeHabits, completedHabits, canceledHabits];
}

export default useHabitList;