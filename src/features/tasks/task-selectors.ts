import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export const getAllHabits = (state: RootState) => state.tasks.habits;

export const getActiveHabits = createSelector(
    [getAllHabits],
    (habits) => habits.filter(habit => habit.status === 'progress')
);

export const getCanceledHabits = createSelector(
    [getAllHabits],
    (habits) => habits.filter(habit => habit.status === 'canceled')
);

export const getCompletedHabits = createSelector(
    [getAllHabits],
    (habits) => habits.filter(habit => habit.status === 'completed')
);