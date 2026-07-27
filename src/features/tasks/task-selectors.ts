import type { RootState } from "../../store";

export const getAllHabits = (state: RootState) => state.tasks.habits;
export const getActiveHabits = (state: RootState) => state.tasks.habits.filter(habit => habit.status === 'progress');
export const getCompletedHabits = (state: RootState) => state.tasks.habits.filter(habit => habit.status === 'completed');
export const getCanceledHabits = (state: RootState) => state.tasks.habits.filter(habit => habit.status === 'canceled');