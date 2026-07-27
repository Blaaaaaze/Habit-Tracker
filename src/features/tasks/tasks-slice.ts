import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Habbit, HabbitStatus } from "../../types/Habbit";

type HabitsSlice = {
    habits: Habbit[]
}

const initialState: HabitsSlice = {
    habits: []
}

const tasksSlice = createSlice({
    name: '@@tasks',
    initialState,
    reducers: {
        createHabit: {
            reducer: (state, action: PayloadAction<Habbit>) => {
                state.habits.push(action.payload);
            },
            prepare: (title: string, goal: number): {payload: Habbit} => ({
                payload: {
                    id: new Date().toString(),
                    title: title,
                    goal: goal,
                    score: 0,
                    status: 'progress',
                }
            })
        },
        addProgress: (state, action: PayloadAction<string>) => {
            state.habits = state.habits.map(habit => {
                if (habit.id !== action.payload) return habit;
                return {
                    ...habit,
                    score: habit.score + 1,
                }
            })
        },
        clearProgress: (state, action: PayloadAction<string>) => {
            state.habits = state.habits.map(habit => {
                if (habit.id !== action.payload) return habit;
                return {
                    ...habit,
                    score: 0,
                }
            })
        },
        changeStatus: {
            reducer: (state, action: PayloadAction<{id: string, newStatus: HabbitStatus}>) => {
                state.habits = state.habits.map(habit => {
                    if (habit.id !== action.payload.id) return habit;
                    return {
                        ...habit,
                        status: action.payload.newStatus,
                    }
                })
            },
            prepare: (id: string, newStatus: HabbitStatus): {payload: {id: string, newStatus: HabbitStatus}} => ({
                payload: {
                    id: id,
                    newStatus: newStatus,
                }
            })
        },
        deleteHabit: (state, action: PayloadAction<string>) => {
            state.habits = state.habits.filter(habit => habit.id !== action.payload);
        }
            
    },
});

export const tasksReducer = tasksSlice.reducer;
export const {createHabit, changeStatus, addProgress, deleteHabit, clearProgress} = tasksSlice.actions